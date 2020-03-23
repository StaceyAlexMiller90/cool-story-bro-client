import React from 'react'
import './card.css'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/button";

const HomePageCard = (props) => {

  const styles = {
    color: props.color,
    backgroundColor: props.background,
  };

  return (
      <div className='center mw5 mw6-ns hidden ba mv4' style={styles}>
        <p className='center f4 mv0 pv2 ph3'>{props.title}</p>
        <div className='center f6 f5-ns lh-copy measure mv0 pa3 bt'>
          <p>{props.description}</p>
          <Link to={`/homepages/${props.id}`}>
                <Button>Visit page</Button>
          </Link>
        </div>
    </div>
  )
}
export default HomePageCard