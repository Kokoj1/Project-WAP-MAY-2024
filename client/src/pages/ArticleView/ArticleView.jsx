import { Link, useParams, useNavigate } from "react-router-dom";
import { getArticle, deleteArticle } from "../../models/Article";
import { useState, useEffect } from "react";

export default function ArticleView() {
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
  }

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (article.name === formData) {
      const data = await deleteArticle(id);
      if (data.status === 200) {
        navigate("/");
      } else {
        setInfo(data.msg);
      }
    } else {
      setInfo("Wrong input!");
    }
  }

  if (isLoaded === null) {
    return (
      <>
        <p>Article not found</p>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Article is loading...</p>
      </>
    )
  }

  return (
    <>
      <h1>Article view</h1>
      <p>{article.name}</p>
      <p>{article.heading}</p>
      <p>{article.body}</p>
      <p>{article.heading2}</p>
      <p>{article.body2}</p>
      <p>Reference: {article.reference}</p>
      <p>Author: {article.author}</p>
      <p>Date of creation: {article.date}</p>
<br></br>
      <p>Content of Article</p>
      <p>{article.name}</p>
      <p>{article.heading}</p>
      <p>{article.heading2}</p>
      <p>{article.reference}</p>
      
      <Link to={`/updatearticle/${id}`}>
        <p>Update article</p>
      </Link>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
