import { Link } from "react-router-dom";

export default function({ article }) {

  return (
    <>
      <Link to={`/article/${article._id}`}>
        <p>{article.title}</p>
      </Link>
    </>
  );
}