import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Jumbotron } from "react-bootstrap";
import { fetchHomepages } from "../../store/homepage/actions";
import { selectHomepages } from '../../store/homepage/selectors'
import { selectAppLoading } from '../../store/appState/selectors'
import HomePageCard from '../../components/HomepageCard'
import Loading from '../../components/Loading'

const Homepage = (props) => {
  const homepages = useSelector(selectHomepages)
  const appLoading = useSelector(selectAppLoading)
  const dispatch = useDispatch()
  const pagekey = props.location.key
 
  useEffect(() => {
    dispatch(fetchHomepages())
  }, [dispatch, pagekey])

  return (
    <div>
      <Jumbotron style={{color: '#8D0033', backgroundColor: '#FFFFFF'}}>
        <h1>All homepages</h1>
      </Jumbotron>
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

