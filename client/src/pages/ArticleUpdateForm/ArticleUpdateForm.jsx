import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateArticle, getArticle } from "../../models/Article";

export default function ArticleUpdateForm() {
  const { id } = useParams();
  const [article, setArticle] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getArticle(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setArticle(data.payload);
      setLoaded(true);
    }
  };

  const postForm = async () => {
    const article = await updateArticle(id, formData);
    if (article.status === 200) {
      navigate(`/article/${id}`);
    } else {
      setInfo(article.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Article not found</p>
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
      <h1>Article update form</h1>
      <p>{id}</p>
      <form>
        <input
          type="text"
          defaultValue={article.name}
          name="name"
          required
          placeholder="Enter Article name"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          defaultValue={article.heading}
          name="heading"
          required
          placeholder="Enter heading"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          defaultValue={article.body}
          name="body"
          required
          placeholder="Enter text"
          onChange={(e) => handleChange(e)}
        />
           <input
          type="text"
          defaultValue={article.heading2}
          name="heading2"
          required
          placeholder="Enter heading (not required)"
          onChange={(e) => handleChange(e)}
        />
           <input
          type="text"
          defaultValue={article.body2}
          name="body2"
          required
          placeholder="Enter text (not required)"
          onChange={(e) => handleChange(e)}
        />
           <input
          type="text"
          defaultValue={article.referece}
          name="reference"
          required
          placeholder="Enter reference (not required)"
          onChange={(e) => handleChange(e)}
        />   <input
          type="text"
          defaultValue={article.author}
          name="author"
          required
          placeholder="Enter author name"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handlePost}>Update article</button>
      </form>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
