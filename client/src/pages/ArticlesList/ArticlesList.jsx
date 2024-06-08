import { useState, useEffect } from "react";
import { getArticles } from "../../models/Articles";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
    <div style={{display: "flex", "flexDirection": "column"}}>      
      {
        articles.map((article, index) => {
          return (
            <Card className="m-2" style={{ width: "98%" }} key={index}>
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.content.replace(/<[^>]*>/g, "").slice(0, 40) + (article.content.replace(/<[^>]*>/g, "").slice(0, 40).length >= 40 ? "..." : "")}</Card.Text>
                <Button className="btn" variant="primary" onClick={() => {window.location = `/article/${article._id}`;}}>Visit</Button>
             </Card.Body>
           </Card>
         );
        })
      }
    </div>
  );
}