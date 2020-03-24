import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { addStory } from "../../store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";

const Postform = (props) => {
  const dispatch = useDispatch()

  const [ post, setPost ] = useState(
      {
        name: '',
        content: '',
        imageUrl: '',
        homepageId: props.homepageId 
      }
    )

  const postForm = (event) => {
    event.preventDefault()
    dispatch(addStory(post))
    setPost(      
    {
      name: '',
      content: '',
      imageUrl: '',
      homepageId: props.homepageId 
    })
  }

  return (
    <Container>
    <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
      <h1 className="mt-5 mb-5">Post a cool story bro</h1>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={post.name}
          onChange={event => setPost({...post, name: event.target.value})}
          type="text"
          placeholder="Name of your story"
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          value={post.content}
          onChange={event => setPost({...post, content: event.target.value})}
          type="text"
          placeholder="Tell us all about it"
          required
        />
        <Form.Text className="text-muted">
          Explicit content will not banned as I don't know how to do that yet...
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicImage">
        <Form.Label>ImageUrl</Form.Label>
        <Form.Control
          value={post.imageUrl}
          onChange={event => setPost({...post, imageUrl: event.target.value})}
          type="text"
          placeholder="link to your image"
          required
        />
      </Form.Group>
      <Form.Group className="mt-5">
        {!post.imageUrl ? <div>Preview Image</div> 
                        : <img src={post.imageUrl} alt='preview'/>}
        <Button variant="primary" type="submit" onClick={postForm}>
          Post!
        </Button>
      </Form.Group>
    </Form>
  </Container>
  )
}

export default Postform
