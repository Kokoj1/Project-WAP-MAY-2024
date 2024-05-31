import { useState, useEffect } from "react";
import { getArticles } from "../../models/Articles";
import { Link } from "react-router-dom";

import ArticleLink from "../../components/ArticleLink";

export default function() {

  const [articles, setArticles] = useState("");
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {

    const data = await getArticles();

    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setArticles(data.payload);
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
        <p>Articles are loading...</p>
      </>
    );
  }

  return (
    <>
      <Link to="/create"><p>Create article</p></Link>
      {
        articles.map((article, index) => {
          return (<ArticleLink key={index} article={article} />);
        })
      }
    </>
  );
}