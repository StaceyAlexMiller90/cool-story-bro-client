import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleHomepage } from "../../store/homepagedetails/actions";
import { selectAppLoading } from '../../store/appState/selectors'
import Loading from '../../components/Loading'
import JumbotronHeader from '../../components/JumbotronHeader'
import { useParams } from "react-router-dom";
import { selectHomepageDetails } from "../../store/homepagedetails/selectors";
import Stories from '../../components/Stories'

const HomepageDetails = () => {
  const homepage = useSelector(selectHomepageDetails)
  const appLoading = useSelector(selectAppLoading)
  const { id } = useParams();
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchSingleHomepage(id))
  }, [dispatch, id])

  return (
    <> {appLoading || !homepage ?
      <Loading />  
      : <>
        <JumbotronHeader 
          title={homepage.title} 
          description={homepage.description} 
          background={homepage.backgroundColor}
          color={homepage.color}
        />
        <Stories homepage={homepage} stories={homepage.stories}/>
      </> 
      }
    </>
  )
}

export default HomepageDetails

