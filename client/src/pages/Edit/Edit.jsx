import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { getArticle, updateArticle } from "./../../models/Articles";

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
    let status = document.getElementById("status");
    status.innerHTML = "Status: Updating...";
    updateArticle(id, {
      content: inputMarkup
    });
    status.innerHTML = "Status: Success!";
  }

  return (
    <>
      <Link to={`/article/${id}`}><p>Back</p></Link>
      <h3>How to edit?</h3>
      <ol>
        <li>Click on copy</li>
        <li>Paste the HTML into your IDE ( if you don't have any use any online beautifier )</li>
        <li>Edit the HTML</li>
        <li>Paste the edited HTML into text box</li>
        <li>Click on preview</li>
        <li>If you are satisfied click on submit</li>
      </ol>
      <button onClick={handleCopy}>Copy</button><br />
      <input type="text" onChange={handleChange} placeholder="Paste your HTML here"></input><br />
      <button onClick={handlePreview}>Preview</button><br />
      <button onClick={handleSubmit}>Submit</button>
      <p id="status">Status: None</p>
      <h2>Preview</h2>
      <div id="preview" dangerouslySetInnerHTML={{__html: markup}} />
    </>
  );
}