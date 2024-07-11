/*
Author: Alisa Ho (hckalisa@gmail.com)
App.tsx (c) 2024
Desc: Homepage for website
Created:  2024-07-08T02:40:13.520Z
*/

import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";
import ImageClassification from "./pages/imageClassification";
import ObjectDetection from "./pages/objectDetection";

function App() {
    return (
        <main className="App h-screen flex flex-col bg-indigo-950">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<ImageClassification />} />
                    <Route
                        path="ObjectDetection"
                        element={<ObjectDetection />}
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </main>
    );
}

export default App;
