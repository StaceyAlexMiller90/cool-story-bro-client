import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Jumbotron } from "react-bootstrap";
import { fetchHomepages } from "../../store/homepage/actions";
import { selectHomepages } from '../../store/homepage/selectors'
import { selectAppLoading } from '../../store/appState/selectors'
import HomePageCard from '../../components/HomepageCard'
import Loading from '../../components/Loading'

const Homepage = () => {
  const homepages = useSelector(selectHomepages)
  const appLoading = useSelector(selectAppLoading)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchHomepages())
  }, [dispatch])

  return (
    <div>
      <Jumbotron>
        <h1>Homepages</h1>
      </Jumbotron>
      {console.log(appLoading)}
      {appLoading ? <Loading /> 
        : homepages.map(page => {
            return <HomePageCard 
                    key={page.id}
                    id={page.id} 
                    title={page.title} 
                    description={page.description}
                    background={page.backgroundColor}
                    color={page.color} 
                  />
        })
      }
    </div>
  )
}

export default Homepage

