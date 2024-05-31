export const getArticles = async () => {

  const req = await fetch("http://localhost:3000/articles", {
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

export const getArticle = async (id) => {

  const req = await fetch(`http://localhost:3000/articles/${id}`, {
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

export const createArticle = async (formData) => {

  /* ARTICLE MODEL

    title   => Title of the article
    content => The article in HTML

    {title: String, content: String}

  */

  const req = await fetch(`http://localhost:3000/articles`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    "method": "POST",
    "body": JSON.stringify(formData)
  });

  const data = await req.json();

  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg
  };
}

export const updateArticle = async (id, formData) => {

  const req = await fetch(`http://localhost:3000/articles/${id}`, {
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    "method": "PUT",
    "body": JSON.stringify(formData)
  });

  const data = await req.json();

  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg
  };
}

export const deleteArticle = async (id) => {

  const req = await fetch(`http://localhost:3000/articles/${id}`, {
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

export const searchByName = async (searchTerm) => {
  /* TO DO */
}