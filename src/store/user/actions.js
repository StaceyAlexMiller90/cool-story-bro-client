import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = userWithToken => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken
  };
};

const tokenStillValid = userWithoutToken => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password
      });
    
      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

const addStoryToHomepage = (data) => {
  return {type: 'ADD_STORY', payload: data}
}

export const addStory = (story) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    dispatch(appLoading())
    const { name, content, imageUrl, homepageId } = story
    try {
      const response = await axios.post(`${apiUrl}/homepages/${homepageId}/stories`,
      { name, content, imageUrl, homepageId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(addStoryToHomepage(response.data))
      dispatch(showMessageWithTimeout("success", false, "Post Added!", 1500))
    } catch (e) {
      console.log(e.message)
    }
    dispatch(appDoneLoading())
  }
}

const updateHomepage = (data) => {
  return {type: 'EDIT_HOMEPAGE', payload: data}
}

export const changePage = (page) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    dispatch(appLoading())
    const { id, title, description, backgroundColor, color, userId } = page
    try {
      const response = await axios.patch(`${apiUrl}/homepages/${id}`,
      { title, description, backgroundColor, color, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(updateHomepage(response.data))
      dispatch(showMessageWithTimeout("success", false, "Page updated!", 1500))
    } catch (e) {
      console.log(e.message)
    }
    dispatch(appDoneLoading())
  }
}

export const likeUnlikeStory = (storyId, userId) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())

    dispatch(appLoading())
    try {
      const response = await axios.post(`${apiUrl}/likes`,
      { storyId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(updateHomepage(response.data))
    } catch (e) {
      console.log(e.message)
    }
    dispatch(appDoneLoading())
  }
}