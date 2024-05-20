import "./MainPage.css";
import Content from "../../components/MainPage/Content";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <>
    <div className="mainPage">
      <h1>Main page</h1>
      <Link to={"/createarticle"}>
        <p>Create article</p>
      </Link>
      <Link to={"/articles"}>
        <p>Articles</p>
      </Link>
      <Link to="/search">Search Articles</Link>
    </div>
    </>
  );
}
