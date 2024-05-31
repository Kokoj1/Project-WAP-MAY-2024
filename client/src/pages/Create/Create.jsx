import { useState } from "react";
import { Link } from "react-router-dom";

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
      <h1>Create article</h1>
      <Link to="/"><p>Back</p></Link>
      <form>
        <input type="text" name="title" placeholder="Article title" onChange={handleChange} /><br />
        <input type="text" name="content" placeholder="Article content (HTML)" onChange={handleChange} /><br />
        <button onClick={create}>Submit</button>
      </form>
    </>
  );
}