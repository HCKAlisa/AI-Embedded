/*
Author: Alisa Ho (hckalisa@gmail.com)
App.tsx (c) 2024
Desc: Homepage for website
Created:  2024-07-08T02:40:13.520Z
*/



import React from "react";
import FormPage from "./pages/form";
import './App.css'
import Header from "./components/header";
import Footer from "./components/footer";
import ImageClassification from "./pages/imageClassification";
import ObjectDetection from "./pages/objectDetection";

function App() {

  return (
    <main className="App h-screen flex flex-col bg-indigo-950">
      <Header />
      <ObjectDetection/>
      {/* <ImageClassification /> */}
      {/* <FormPage /> */}
      <Footer />
    </main>
  );
}

export default App
