import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import JumbotronHeader from '../../components/JumbotronHeader'
import Loading from '../../components/Loading'
import Stories from '../../components/Stories'
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/button";
import Editform from '../../components/Editform'
import Postform from '../../components/Postform'


const MyHomepage = () => {
  const history = useHistory()
  const [ edit, setEdit ] = useState(false)
  const [ post, setPost ] = useState(false)
  const {token, homepage, id } = useSelector(selectUser)
 
  useEffect(() => {
    setEdit(false)
    setPost(false)
  }, [homepage])

  if (token === null) {
    history.push("/");
  }

  if (homepage === null) {
    return <Loading />;
  }
  
  const buttons = !edit && !post ? true : false

  return (
    <div> 
      <JumbotronHeader
        color={homepage.color}
        background={homepage.backgroundColor}
        title={homepage.title} 
        description={homepage.description}
      />
      {buttons ? <div className='buttonbar'>
                  <Button onClick={() => setEdit(true)}>Edit My Page</Button>
                  <Button onClick={() => setPost(true)}>Post a cool story bro</Button>
                  {!homepage.stories.length ? null : <Stories stories={homepage.stories}/>}
                </div>
               : edit ? <Editform userId={id}/> 
               : post ? <Postform homepageId={homepage.id}/> 
               : null}
      
    </div>
  )
}

export default MyHomepage

