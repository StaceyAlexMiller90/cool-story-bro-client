import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
import Button from "react-bootstrap/button";
import { selectUser } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";

const Stories = (props) => {
  const [ expand, setExpand ] = useState(false)
  const user = useSelector(selectUser)

  const likes = props.stories.flatMap(story => story.users.map(user => user.name))

  const expandLikes = () => {
    setExpand(true)
  }

  const toggleLike = () => {

  }

  return (
    <div>
      {expand ? <p>
      {likes.map((like, i) => i === likes.length-1 ? `${like} ` : `${like}, `)} 
      liked this post</p> 
      : !likes.length ? null 
       : <p>
         {likes[Math.floor(Math.random()*likes.length)]} & 
         <Button onClick={expandLikes}>{likes.length-1}</Button> 
         {likes.length-1 === 1 ? 'other user' : 'others'} liked this post </p>}
      
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
              <Button onClick={toggleLike}>Like this story</Button>
            </Carousel.Caption>
            </Carousel.Item>
        )})}
      </Carousel>
    </div>
  )
}

export default Stories

