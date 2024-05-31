import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { deleteArticle } from "../../models/Articles";
import Button from "react-bootstrap/Button";

export default function() {

  let { id } = useParams();

  let debounce = true;

  const [isLoaded, setLoaded] = useState(false);

  const deleteHandle = async () => {

    if (!debounce) return; // for whatever reason the function will get called twice, this prevents that
    debounce = false;

    const data = await deleteArticle(id);

    if (data.status === 500 || data.status === 404) setLoaded(null);
    if (data.status === 200) setLoaded(true);
  }

  useEffect(() => {
    deleteHandle();
  }, []);

  const handleClick = () => {
    window.location = "/";
  }

  if (isLoaded === null) {
    return (
      <>
        <div className="text-center">
          <p className="mt-3">Well that's not supposed to happen</p>
          <Button className="btn-lg" variant="primary" type="submit" onClick={handleClick}>Back</Button>
        </div>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <div className="text-center">
          <p className="mt-3">Trying to delete article, please don't leave</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-center">
         <p className="mt-3">Article successfully deleted, you may now return</p>
         <Button className="btn-lg" variant="primary" type="submit" onClick={handleClick}>Back</Button>
      </div>
    </>
  );
}