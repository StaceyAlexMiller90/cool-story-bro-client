import React from 'react'
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import JumbotronHeader from '../../components/JumbotronHeader'
import Loading from '../../components/Loading'
import Stories from '../../components/Stories'
import { selectAppLoading } from '../../store/appState/selectors'
import { useHistory } from "react-router-dom";

const MyHomepage = () => {
  const history = useHistory()
  const {token, homepage, id} = useSelector(selectUser)
  const appLoading = useSelector(selectAppLoading)

  if (token === null) {
    history.push("/");
  }

  if (homepage === null) {
    return <Loading />;
  }

  return (
    <div> 
    {appLoading ? <Loading /> 
    : <>
      <JumbotronHeader 
        color={homepage.color}
        background={homepage.backgroundColor}
        title={homepage.title} 
        description={homepage.description}
      />
      <Stories stories={homepage.stories}/>
      </>
    }
    </div>
  )
}

export default MyHomepage

