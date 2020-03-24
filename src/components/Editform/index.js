import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { changePage } from "../../store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { selectUser } from "../../store/user/selectors";

const Editform = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const [ page, setPage ] = useState(user.homepage)

  const editPage = (event) => {
    event.preventDefault()
    dispatch(changePage(page))
    setPage(user.homepage)
  }

  return (
       <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">Edit your page</h1>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={page.title}
              onChange={event => setPage({...page, title: event.target.value})}
              type="text"
              placeholder="Enter a catchy title"
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={page.description}
              onChange={event => setPage({...page, description: event.target.value})}
              type="text"
              placeholder="Tell us all about it"
            />
          </Form.Group>
          <Form.Group controlId="formBasicBackgroundColor">
            <Form.Label>Background</Form.Label>
            <Form.Control
              value={page.backgroundColor}
              onChange={event => setPage({...page, backgroundColor: event.target.value})}
              type="color"
            />
          </Form.Group>
          <Form.Group controlId="formBasicColor">
            <Form.Label>Text Color</Form.Label>
            <Form.Control
              value={page.color}
              onChange={event => setPage({...page, color: event.target.value})}
              type="color"
            />
          </Form.Group>
          <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={editPage}>
              Save changes!
            </Button>
          </Form.Group>
        </Form>
      </Container>
  )
}

export default Editform