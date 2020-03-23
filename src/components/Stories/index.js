import React from "react";
import Carousel from 'react-bootstrap/Carousel'

const Stories = (props) => {

  console.log(props)
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
            </Carousel.Caption>
            </Carousel.Item>
        )})}
      </Carousel>
    </div>
  )
}

export default Stories

