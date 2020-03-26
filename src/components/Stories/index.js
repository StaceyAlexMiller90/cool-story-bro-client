import React, { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel'
import Button from "react-bootstrap/button";
import { useDispatch, useSelector } from "react-redux";
import { likeStory, unLikeStory } from '../../store/homepagedetails/actions'
import { selectUser } from '../../store/user/selectors'
import { selectAppLoading } from '../../store/appState/selectors'
import Loading from '../../components/Loading'


const Stories = (props) => {
  const [ expand, setExpand ] = useState(false)
  const dispatch = useDispatch()
  const { homepage, id } = useSelector(selectUser)
  const appLoading = useSelector(selectAppLoading)

  const expandLikes = () => setExpand(true)
  

  const toggleLike = (storyId, homepageId) => {

  const userLiked = props.stories.map(story => {
    return story.users.map(user => {
      return user.id === id && story.id === storyId ? true : false
      })
    })
    const answer = userLiked.flat().includes(true) ? true : false
    if(answer) {
      dispatch(unLikeStory(storyId, id, homepageId))
    } else {
      dispatch(likeStory(storyId, id, homepageId))
    }     
  }

  if(appLoading) {
    return <Loading />
  }

  return (
    <div>     
      <Carousel className='w-50'>
        {props.stories.map(story => {
          return (
            <Carousel.Item key={story.id}>
              <img
                className="d-block w-100"
                src={story.imageUrl}
                alt={`Story ${story.id}`}
              />
            <Carousel.Caption>
              <h3>{story.name}</h3>
              <p>{story.content}</p>
              {!homepage || story.homepageId === homepage.id ? null 
              : <Button onClick={() => toggleLike(story.id, story.homepageId)}>Like</Button>}

              {expand ? <p>
                {console.log(story.users)}
                {story.users.map((user, i) => i === story.users.length-1 ? `${user.name} ` : `${user.name}, `)} 
                liked this post</p> 
                  : !story.users.length ? null
                  : story.users.length === 1 ? `${story.users[0].name} liked this post` 
                  : <p>
                  {story.users[Math.floor(Math.random()*story.users.length)].name} & 
                  <Button onClick={expandLikes}>{story.users.length-1}</Button> 
                  {story.users.length-1 === 1 ? 'other user' : 'others'} liked this post </p>}

            </Carousel.Caption>
            </Carousel.Item>
            )})}
      </Carousel>
    </div>
  )
}

export default Stories

