import React from "react";
import { Jumbotron } from "react-bootstrap";

const JumbotronHeader = (props) => {

  const styles = {
    color: props.color,
    backgroundColor: props.background,
  };

  return (
    <div>
      <Jumbotron style={styles}>
        <h1>{props.title}</h1>
        <h4>{props.description}</h4>
      </Jumbotron>
    </div>
  )
}

export default JumbotronHeader