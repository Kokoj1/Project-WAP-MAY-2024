export const getImages = async (id) => {

  const req = await fetch(`http://localhost:3000/images`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    "method": "GET"
  });

  const data = await req.json();

  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg
  };
}

export const getImage = async (id, view) => {

  const req = await fetch(`http://localhost:3000/images/${id}/${view}`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    "method": "GET"
  });

  const data = await req.json();

  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg
  };
}

export const uploadImage = async (formData) => {

  /* ARTICLE MODEL

    name        => Image name
    description => Image description
    copyright   => copyright
    data        => image's data
    contentType => image type e.g. .jpg, .jpeg, .png ...

    {
      name: String,
      description: String,
      copyright: String,
      img: {
        data: Buffer,
        contentType: String
      }
    }

  */

  console.log(formData);

  const req = await fetch(`http://localhost:3000/images`, {
    "method": "POST",
    "body": formData
  });

  const data = await req.json();

  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg
  };
}

export const updateImage = async (id, formData) => {

  console.log(formData);

  const req = await fetch(`http://localhost:3000/images/${id}`, {
    "method": "PUT",
    "body": formData
  });

  const data = await req.json();

  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg
  };
}

export const deleteImage = async (id) => {

  const req = await fetch(`http://localhost:3000/images/${id}`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    "method": "DELETE"
  });

  const data = await req.json();

  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg
  };
}