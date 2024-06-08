// REACT ROUTER

import { BrowserRouter, Routes, Route } from "react-router-dom";

// ENDPOINTS

import ArticlesList from "./ArticlesList/ArticlesList";
import Article from "./Article/Article";
import Edit from "./Edit/Edit";
import Delete from "./Delete/Delete";
import Create from "./Create/Create";

import UploadImage from "./UploadImage/UploadImage";
import ImageView from "./ImageView/ImageView";
import ImagesList from "./ImagesList/ImagesList";
import DeleteImage from "./DeleteImage/DeleteImage"
import EditImage from "./EditImage/EditImage";

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
        <Route path="/image" element={<UploadImage />} />
        <Route path="/image/:id/:view" element={<ImageView />} />
        <Route path="/images" element={<ImagesList />} />
        <Route path="/image/delete/:id" element={<DeleteImage />} />
        <Route path="/image/edit/:id" element={<EditImage />} />

      </Routes>
    </BrowserRouter>

  );
}