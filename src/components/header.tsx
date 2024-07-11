/*
Author: Alisa Ho (hckalisa@gmail.com)
header.tsx (c) 2024
Desc: Hearder for website
Created:  2024-07-08T02:38:08.798Z
*/

import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <div className="bg-indigo-900 h-16 flex items-center justify-between px-4">
            <Link
                to="/"
                className="text-4xl font-extrabold leading-none tracking-tight"
            >
                AI
            </Link>
            <div>
                <Link to="/">Image Classification</Link>
                <Link to="/ObjectDetection" className="pl-4">
                    Object Detection
                </Link>
            </div>
        </div>
    );
};

export default Header;
