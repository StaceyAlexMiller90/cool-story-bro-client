import axios from 'axios'
import { apiUrl } from '../../config/constants'
import {
  appLoading,
  appDoneLoading,
} from "../appState/actions";
import { selectToken } from "../user/selectors";

export const oneHomepage = response => {
  return {type:"SINGLE_HOMEPAGE_DETAILS_FETCHED", payload: response}
}

export const fetchSingleHomepage = (id) => {
  return async (dispatch, getState) => {
    dispatch(appLoading())
    try {
      const response = await axios.get(`${apiUrl}/homepages/${id}`)
      dispatch(oneHomepage(response.data))
    } catch (e) {
      console.log(e.message)
    }
    dispatch(appDoneLoading())
  }
}

const addLike = (data) => {
  return {type: 'ADD_LIKE', payload: data}
}

export const likeStory = (storyId, userId, homepageId) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())
    dispatch(appLoading())
   
    try {
    await axios.post(`${apiUrl}/likes`,
      { userId, storyId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(fetchSingleHomepage(homepageId))
    } catch (e) {
      console.log(e.message)
    }
    dispatch(appDoneLoading())
  }
}

export const unLikeStory = (storyId, userId, homepageId) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())
    dispatch(appLoading())

    try {
     await axios.delete(`${apiUrl}/likes`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }, data: { userId, storyId }
      })
      dispatch(fetchSingleHomepage(homepageId))
    } catch (e) {
      console.log("This is the error!",e.message)
    }
    dispatch(appDoneLoading())
  }
}
