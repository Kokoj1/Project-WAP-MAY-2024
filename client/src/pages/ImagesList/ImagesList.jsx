import { getImages } from "../../models/Images";

import { useState, useEffect } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function() {

  const [images, setImages] = useState("");
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {

    const data = await getImages();

    console.log(data);

    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setImages(data.payload);
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
        <p>Images are loading...</p>
      </>
    );
  }

  return (
    <>
      <div style={{ display: "flex", "flex-wrap": "wrap", "justify-content": "center", gap: "10px", margin: "5px" }}>
        {
          images.map((image, index) => {
            return <Card style={{ width: "18rem" }} key={index}>

              <Card.Img variant="top" src={`http://localhost:3000/images/${image._id}`} />

              <Card.Body>
                <Card.Title>{image.name}</Card.Title>
              </Card.Body>

              <Card.Body>
                <Button variant="primary" onClick={() => {window.location = `/image/${image._id}/true`}}>View</Button>
              </Card.Body>
            </Card>
          })
        }
      </div>
    </>
  );
}