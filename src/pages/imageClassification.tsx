/*
Author: Alisa Ho (hckalisa@gmail.com)
imageClassification.tsx (c) 2024
Desc: Upload Image for AI to identify object inside the image
Created:  2024-07-08T06:06:04.508Z
*/

import { useState, useEffect, useRef} from "react";
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as mobilenet from "@tensorflow-models/mobilenet";

const ImageClassification = () => {
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [results, setResults] = useState([]);

    const imageRef = useRef();

    const loadModel = async () => {
        setIsModelLoading(true);
        try {
            const loadedmodel = await mobilenet.load();
            setModel(loadedmodel);
            setIsModelLoading(false);
        }
        catch (error) {
            console.log(error);
            console.log("not loaded");
            setIsModelLoading(false);
        }
    }

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = e.target.files;
            if (files?.length > 0) {
                const url = URL.createObjectURL(files[0])
                setImageURL(url);
            } else {
                setImageURL(null);
            }
        }
    }

    const identify = async () => {
        if (!imageRef.current) return;

        const result = await model?.classify(imageRef.current);
        setResults(result);
    }

    useEffect(() => {
        loadModel()
    }, [])

    if (isModelLoading) {
        return (
            <div className="flex flex-col grow items-center justify-center">
                <h1 className="text-4xl font-extrabold leading-none tracking-tight">Model Loading...</h1>
            </div>
        );
    }

    console.log(imageURL);


    return (
        <div className="flex flex-col grow items-center justify-center gap-6">
            <h1 className="text-4xl font-extrabold leading-none tracking-tight">Image Classification</h1>
            <div className="imageUpload flex flex-col gap-6">
                <label htmlFor="imageUploader">Upload Image:</label>
                <input type="file" accept="image/*" id="imageUploader" className="uploadInput" onChange={uploadImage} />
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    { imageURL &&
                        <div className="imageHolder flex flex-col gap-4">
                            <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} className="w-56"/>
                            <button className="bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={identify}>Identify Object</button>
                        </div>
                    }
                    { results && results.length > 0 &&
                        <div></div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ImageClassification;