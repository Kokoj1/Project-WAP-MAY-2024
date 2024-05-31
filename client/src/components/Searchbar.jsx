import SearchbarIcon from "../assets/SearchbarIcon.png";
import { useState } from "react";

export default function() {

  const [query, setQuery] = useState("");

  const redirect = () => {
    window.location = `/searchresults/${query}`;
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") redirect();
  }

  return (
    <>
      <div class="searchbar-wrap">
        <input type="text" placeholder="Search" onChange={handleChange} onKeyPress={handleKeyPress} />
        <button onClick={redirect}><img src={SearchbarIcon} alt="err" /></button>
      </div>
    </>
  );
}