import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getImage } from "./../../models/Images";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function() {

  const { id } = useParams();

  const view = useParams().view.toLowerCase() === "true";

  const [image, setImage] = useState("");
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {

    const data = await getImage(id, view);

    console.log(data);

    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setImage(data.payload);
      setLoaded(true);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Well that's not supposed to happen</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Image is loading...</p>
      </>
    );
  }

  return (
    <>
      <h1>{image.name}</h1>
      <Container style={{ "marginRight": "0px" }}>
          <Row className="justify-content-end">
            <Col className="col-auto">
              <a href={`/image/edit/${id}`}>Edit</a>
            </Col>
            <Col className="col-auto">
              <a href={`/image/delete/${id}`}>Delete</a>
            </Col>
          </Row>
        </Container>
      <p>{image.description}</p>
      <p>{image.copyright}</p>
      <img src={`http://localhost:3000/images/${id}`} alt="Failed to load"/>
    </>
  );
}