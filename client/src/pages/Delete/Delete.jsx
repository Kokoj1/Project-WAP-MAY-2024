import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { deleteArticle } from "../../models/Articles";

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
        <p>Trying to delete article, please don't leave</p>
      </>
    );
  }

  return (
    <>
      <Link to="/"><p>Back</p></Link>
      <p>Article successfully deleted, you may now return</p>
    </>
  );
}