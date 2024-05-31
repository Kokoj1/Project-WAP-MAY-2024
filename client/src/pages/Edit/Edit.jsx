import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getArticle, updateArticle } from "./../../models/Articles";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function() {

  const { id } = useParams();

  const [isLoaded, setLoaded] = useState(false);

  const [markup, setMarkup] = useState("");
  const [inputMarkup, setInputMarkup] = useState("");

  const load = async () => {

    const data = await getArticle(id);

    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setMarkup(data.payload.content);
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
        <p>Loading...</p>
      </>
    );
  }

  const handleChange = (e) => {
    setInputMarkup(e.target.value);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(markup);
  }

  const handlePreview = () => {
    document.getElementById("preview").innerHTML = inputMarkup;
  }

  const handleSubmit = () => {
    updateArticle(id, {
      content: inputMarkup
    });
     window.location = `/article/${id}`
  }

  return (
    <>
      <h3>How to edit?</h3>
      <ol>
        <li>Click on copy</li>
        <li>Paste the HTML into your IDE ( if you don't have any use any online beautifier )</li>
        <li>Edit the HTML</li>
        <li>Paste the edited HTML into text box</li>
        <li>Click on preview</li>
        <li>If you are satisfied click on submit</li>
      </ol>
      
      <Container className="text-center">
        <Row><Button onClick={handleCopy}>Copy</Button></Row>
      </Container>

      <Container className="pt-3">
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="text" name="title" placeholder="Paste your HTML here" onChange={handleChange}/>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container className="text-center">
        <Row><Button onClick={handlePreview}>Preview</Button></Row>
        <Row><Button onClick={handleSubmit}>Submit</Button></Row>
      </Container>

      <h2>Preview</h2>
      <hr />
      <div id="preview" dangerouslySetInnerHTML={{__html: markup}} />
    </>
  );
}