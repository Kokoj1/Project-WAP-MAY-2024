// REACT ROUTER

import { BrowserRouter, Routes, Route } from "react-router-dom";

// ENDPOINTS

import ArticlesList from "./ArticlesList/ArticlesList";
import Article from "./Article/Article";
import Edit from "./Edit/Edit";
import Delete from "./Delete/Delete";
import Create from "./Create/Create";

// CODE \\

export default function() {

  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<ArticlesList />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/create" element={<Create />} />

      </Routes>
    </BrowserRouter>

  );
}