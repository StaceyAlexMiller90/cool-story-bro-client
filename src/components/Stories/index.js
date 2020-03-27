import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
import Button from "react-bootstrap/button";
import { useDispatch, useSelector } from "react-redux";
import { likeStory, unLikeStory } from '../../store/homepagedetails/actions'
import { selectUser } from '../../store/user/selectors'

const Stories = (props) => {
  const [ expand, setExpand ] = useState(false)
  const dispatch = useDispatch()
  const { homepage, id, name } = useSelector(selectUser)

  const expandLikes = () => {
    setExpand(true)
    setTimeout(() => setExpand(false), 3 * 1000)
  }
  
  const checkIfUserLiked = (storyId) => {
      const userLiked = props.stories.map(story => {
      return story.users.map(user => {
        return user.id === id && story.id === storyId ? true : false
        })
      }) 
     return userLiked.flat().includes(true) ? true : false
  }

  const toggleLike = (storyId, homepageId) => {
    checkIfUserLiked(storyId) ? dispatch(unLikeStory(storyId, id, homepageId))
    : dispatch(likeStory(storyId, id, homepageId))
  }

  return (
    <div>     
      <Carousel className="mt-5 w-75 center">
        {props.stories.map(story => {
          return (
            <Carousel.Item key={story.id}>
              <img
                className="d-block w-100 center"
                src={story.imageUrl}
                alt={`Story ${story.id}`}
              />
            <Carousel.Caption className="p-5" 
                style={{backgroundColor: `${props.homepage.backgroundColor}99`,
                        color: props.homepage.color
              }}>
              <h3>{story.name}</h3>
              <p>{story.content}</p>
   
              {!id|| story.homepageId === homepage.id ? null 
              : <Button 
                  style={{backgroundColor: props.homepage.color, 
                          color: props.homepage.backgroundColor, 
                          border: props.homepage.color}}
                  onClick={() => toggleLike(story.id, story.homepageId)}>
                  {checkIfUserLiked(story.id) ? 'Unlike' : 'Like'}
                </Button>}

                {!story.users ? null
                : expand ? <p>
                {story.users.map((user, i) => user.name === name && i === story.users.length-1 ? 'You '
                : user.name === name ? 'You, '
                : i === story.users.length-1 ? `${user.name} ` : `${user.name}, `)} liked this post</p>

                  : story.users.length === 0 ? null
                  : story.users.length === 1 ? story.users[0].name === name ? 'You liked this post': `${story.users[0].name} liked this post`
       
                  : <p>
                  {story.users[0].name === name ? 'You ' 
                  :story.users[0].name} & 
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

