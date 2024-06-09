import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { updateImage } from "./../../models/Images";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

export default function() {

  const { id } = useParams();

  const formData = new FormData();

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    formData.delete(e.target.name);
    if (e.target.name === 'image') {
      formData.set(e.target.name, e.target.files[0]);
      return;
    }
    formData.append(e.target.name, e.target.value);
  }

  const update = (e) => {
    e.preventDefault();
    console.log(formData);
    updateImage(id, formData);
    window.location = `/image/${id}/true`;
  }

  return (
    <>
      <Container className="pt-3">
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Image name" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" placeholder="Image description" onChange={handleChange} />
              </Form.Group>

              <Form.Label>Licensing</Form.Label>
              <Form.Select className="mb-3" onChange={handleChange} name="copyright">
                <option>None selected</option>
                <option>The image was created by the creator</option>
                <option>This image is licensed under the Creative Commons Attribution-Share Alike License</option>
              </Form.Select>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="image" accept=".jpg, .png" onChange={handleChange} />
              </Form.Group>

              <div className="text-center mt-3"><Button className="btn-lg" variant="primary" type="submit" onClick={update}>Submit</Button></div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}