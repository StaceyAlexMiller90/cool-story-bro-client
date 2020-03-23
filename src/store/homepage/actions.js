import axios from 'axios'
import { apiUrl } from '../../config/constants'
import {
  appLoading,
  appDoneLoading,
} from "../appState/actions";

export const homepages = response => {
  return {type:"HOMEPAGES_FETCHED", payload: response}
}

export const fetchHomepages = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading())
    const state = getState()
    try {
      if(!state.homepage.length) {
      const response = await axios.get(`${apiUrl}/homepages`)
      dispatch(homepages(response.data))
      }
    } catch (e) {
      console.log(e.message)
    }
    dispatch(appDoneLoading())
  }
}


