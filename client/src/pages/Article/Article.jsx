import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
      <Link to="/"><p>Back</p></Link>
      <Link to={`/edit/${id}`}><p>Edit</p></Link>
      <Link to={`/delete/${id}`}><p>Delete</p></Link>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{__html: article.content}} />
    </>
  );
}