import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { deleteImage } from "../../models/Images";
import Button from "react-bootstrap/Button";

export default function() {

  let { id } = useParams();

  let debounce = true;

  const [isLoaded, setLoaded] = useState(false);

  const deleteHandle = async () => {

    console.log("Delete: ", id);

    if (!debounce) return;
    debounce = false;

    const data = await deleteImage(id);

    if (data.status === 500 || data.status === 404) setLoaded(null);
    if (data.status === 200) setLoaded(true);
  }

  useEffect(() => {
    deleteHandle();
  }, []);

  const handleClick = () => {
    window.location = "/images";
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
          <p className="mt-3">Trying to delete image, please don't leave</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-center">
         <p className="mt-3">Image successfully deleted, you may now return</p>
         <Button className="btn-lg" variant="primary" type="submit" onClick={handleClick}>Back</Button>
      </div>
    </>
  );
}