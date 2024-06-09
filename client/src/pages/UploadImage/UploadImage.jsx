import { useState } from "react";

import { uploadImage } from "../../models/Images";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

export default function() {

  const [formData, setFormData] = useState();
  const [file, setFile] = useState();

  const submit = async (e) => {

    e.preventDefault();

    const data = new FormData();
    data.append("image", file);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("copyright", formData.copyright);

    console.log(data);

    const response = await uploadImage(data);

    console.log(response);

    if (response.status === 500 || response.status === 404) return setLoaded(null);
    if (response.status === 201) {
      window.location = `/image/${response.payload._id}/true`;
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
                <Form.Control type="file" name="image" accept=".jpg, .png" onChange={e => setFile(e.target.files[0])} />
              </Form.Group>

              <div className="text-center mt-3"><Button className="btn-lg" variant="primary" type="submit" onClick={submit}>Submit</Button></div>
            </Form>
          </Col>
        </Row>
      </Container>
  </>
  );
}