/*
Author: Alisa Ho (hckalisa@gmail.com)
imageClassification.tsx (c) 2024
Desc: Upload Image for AI to identify object inside the image
Created:  2024-07-08T06:06:04.508Z
*/

import { useState, useEffect, useRef } from "react";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocossd from "@tensorflow-models/coco-ssd";
import styled from "styled-components";

const ObjectDetection = () => {
    const [isModelLoading, setIsModelLoading] = useState<boolean>(false);
    const [model, setModel] = useState<cocossd.ObjectDetection | null>(null);
    const [imgData, setImgData] = useState<{} | null>(null);
    const [predictions, setPredictions] = useState<
        { bbox: number[]; class: String; score: number }[]
    >([]);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const isEmptyPredictions = !predictions || predictions.length === 0;

    const imageRef = useRef();

    const loadModel = async () => {
        setIsModelLoading(true);
        try {
            const loadedmodel = await cocossd.load();
            setModel(loadedmodel);
            setIsModelLoading(false);
        } catch (error) {
            console.log(error);
            console.log("not loaded");
            setIsModelLoading(false);
        }
    };

    const TargetBox = styled.div`
    position: absolute;

    left: ${({ x }) => x + "px"};
    top: ${({ y }) => y + "px"};
    width: ${({ width }) => width + "px"};
    height: ${({ height }) => height + "px"};

    border: 4px solid #1ac71a;
    background-color: transparent;
    z-index: 20;

    &::before {
        content: "${({ classType, score }) =>
            `${classType} ${score.toFixed(1)}%`}";
        color: #1ac71a;
        font-weight: 500;
        font-size: 17px;
        position: absolute;
        top: -1.5em;
        left: -5px;
    }
`;

    const readImage = (file: File) => {
        return new Promise((rs, rj) => {
            const fileReader = new FileReader();
            fileReader.onload = () => rs(fileReader.result);
            fileReader.onerror = () => rj(fileReader.error);
            fileReader.readAsDataURL(file);
        });
    };

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsClicked(false);
        if (e.target.files) {
            const file = e.target.files[0];
            const imgData = await readImage(file);
            if (imgData) {
                setImgData(imgData);
            } else {
                setImgData(null);
            }
        }
    };

    const normalizePredictions = (predictions: cocossd.DetectedObject[]) => {
        const element = document.getElementById("uploadedImage");
        if (!element) return;
        if (!predictions || !imageRef) return predictions || [];

        var rect: DOMRect = element?.getBoundingClientRect();

        return predictions.map((prediction) => {
            if (!imageRef.current) return;

            const { bbox } = prediction;
            const oldX: number = bbox[0];
            const oldY: number = bbox[1];
            const oldWidth: number = bbox[2];
            const oldHeight: number = bbox[3];

            const imgWidth: number = imageRef.current.width;
            const imgHeight: number = imageRef.current.height;

            const x: number =
                rect.x + (oldX * imgWidth) / imageRef.current.width;
            const y: number =
                rect.y + (oldY * imgHeight) / imageRef.current.height;
            const width: number =
                (oldWidth * imgWidth) / imageRef.current.width;
            const height: number =
                (oldHeight * imgHeight) / imageRef.current.height;

            return { ...prediction, bbox: [x, y, width, height] };
        });
    };

    const detectObjectsOnImage = async () => {
        setIsClicked(true);
        if (!imageRef.current || !model) return;

        const predictions: cocossd.DetectedObject[] = await model.detect(
            imageRef.current
        );
        const normalizedPredictions: {
            bbox: number[];
            class: string;
            score: number;
        }[] = normalizePredictions(predictions);
        setPredictions(normalizedPredictions);
        console.log("Predictions: ", predictions);
    };

    useEffect(() => {
        loadModel();
    }, []);

    if (isModelLoading) {
        return (
            <div className="flex flex-col grow items-center justify-center">
                <h1 className="text-4xl font-extrabold leading-none tracking-tight">
                    Model Loading...
                </h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col grow items-center justify-center gap-6">
            <h1 className="text-4xl font-extrabold leading-none tracking-tight">
                Object Detection
            </h1>
            <div className="imageUpload flex flex-col gap-6">
                <label htmlFor="imageUploader">Upload Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    id="imageUploader"
                    className="uploadInput"
                    onChange={uploadImage}
                />
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    {imgData && (
                        <div className="imageHolder flex flex-col gap-4">
                            <img
                                id="uploadedImage"
                                src={imgData}
                                alt="Upload Preview"
                                crossOrigin="anonymous"
                                ref={imageRef}
                                className="h-64"
                            />
                            {isClicked &&
                                !isEmptyPredictions &&
                                predictions.map((prediction, idx) => (
                                    <TargetBox
                                        key={idx}
                                        x={prediction.bbox[0]}
                                        y={prediction.bbox[1]}
                                        width={prediction.bbox[2]}
                                        height={prediction.bbox[3]}
                                        classType={prediction.class}
                                        score={prediction.score * 100}
                                    />
                                ))}
                            <button
                                className="bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                onClick={detectObjectsOnImage}
                            >
                                Detect Object
                            </button>
                            {isClicked && isEmptyPredictions && (
                                <h1>Cannot detect object</h1>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ObjectDetection;
