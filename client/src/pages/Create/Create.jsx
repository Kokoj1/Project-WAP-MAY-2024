import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { createArticle } from "../../models/Articles";

export default function() {

  const [formData, setFormData] = useState();

  const create = async (e) => {

    e.preventDefault();

    const data = await createArticle(formData);

    console.log(data);

    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 201) {
      window.location = `/article/${data.payload._id}`;
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
  <>
    <Container className="pt-3">
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="Enter title" onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control type="text" name="content" placeholder="Article content (HTML)" onChange={handleChange} />
            </Form.Group>
            <div className="text-center"><Button className="btn-lg" variant="primary" type="submit" onClick={create}>Create</Button></div>
          </Form>
        </Col>
      </Row>
    </Container>
  </>
);

}