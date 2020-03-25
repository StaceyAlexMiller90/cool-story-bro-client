import React, { useState, StrictMode } from "react";
import Carousel from 'react-bootstrap/Carousel'
import Button from "react-bootstrap/button";
import { useDispatch, useSelector } from "react-redux";
import { likeUnlikeStory } from '../../store/user/actions'
import { selectUser } from '../../store/user/selectors'

const Stories = (props) => {
  const [ expand, setExpand ] = useState(false)
  const dispatch = useDispatch()
  const {token, homepage, id } = useSelector(selectUser)


  const expandLikes = () => {
    setExpand(true)
  }

  const toggleLike = (storyId) => {
    console.log("toggle")
    // dispatch(likeUnlikeStory(storyId, id))
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
              <Button onClick={() => toggleLike(story.id)}>Like this story</Button>
              {console.log(story.users)}
              {expand ? <p>
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

// {expand ? <p>
//   {likes.map((like, i) => i === likes.length-1 ? `${like.name} ` : `${like.name}, `)} 
//   liked this post</p> 
//   : !likes.length ? null 
//    : <p>
//      {likes[Math.floor(Math.random()*likes.length)].name} & 
//      <Button onClick={expandLikes}>{likes.length-1}</Button> 
//      {likes.length-1 === 1 ? 'other user' : 'others'} liked this post </p>}

