import { getImages } from "../../models/Images";

import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";

export default function() {

  const [images, setImages] = useState("");
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {

    const data = await getImages();

    console.log(data);

    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setImages(data.payload);
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
        <p>Images are loading...</p>
      </>
    );
  }

  return (
    <>
      {
        images.map((image, index) => {
          return <div key={index}>
            <p>{image.name}</p>
            <Button onClick={() => {window.location = `/image/${image._id}/true`}}>Visit</Button>
          </div>
        })
      }
    </>
  );
}