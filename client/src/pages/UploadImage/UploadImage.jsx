import { useState } from "react";

import { uploadImage } from "../../models/Images";

export default function() {

  const [formData, setFormData] = useState();
  const [file, setFile] = useState();

  const submit = async (e) => {

    e.preventDefault();

    const data = new FormData();
    data.append("image", file);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("copyright", formData.copyright);

    console.log(data);

    const response = await uploadImage(data);

    console.log(response);

    if (response.status === 500 || response.status === 404) return setLoaded(null);
    if (response.status === 201) {
      window.location = `/image/${response.payload._id}/true`;
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
  <>
    <input type="file" name="image" accept=".jpg, .png" onChange={e => setFile(e.target.files[0])}/>
    <input type="text" name="name" onChange={e => handleChange(e)}/>
    <input type="text" name="description" onChange={e => handleChange(e)}/>
    <input type="text" name="copyright" onChange={e => handleChange(e)}/>

    <button type="submit" onClick={submit}>Create</button>
  </>
  );
}