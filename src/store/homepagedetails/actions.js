import axios from 'axios'
import { apiUrl } from '../../config/constants'
import {
  appLoading,
  appDoneLoading,
} from "../appState/actions";

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
