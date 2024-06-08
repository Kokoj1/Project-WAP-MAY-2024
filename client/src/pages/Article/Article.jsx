import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getArticle } from "./../../models/Articles";

export default function() {

  const { id } = useParams();

  const [article, setArticle] = useState("");
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {

    const data = await getArticle(id);

    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setArticle(data.payload);
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
        <p>Article is loading...</p>
      </>
    );
  }
  
  return (
    <>
      <h1 className="mt-3">{article.title}</h1>
        <Container style={{ "marginRight": "0px" }}>
          <Row className="justify-content-end">
            <Col className="col-auto">
              <a href={`/edit/${id}`}>Edit</a>
            </Col>
            <Col className="col-auto">
              <a href={`/delete/${id}`}>Delete</a>
            </Col>
          </Row>
        </Container>
      <div dangerouslySetInnerHTML={{__html: article.content}} />
    </>
  );
}