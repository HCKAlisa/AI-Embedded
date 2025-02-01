# AI Embedded

This is a simple implementation of AI that can perform image classification and object detection. It uses React, Typescript and NodeJS for the website, TensorFlow.js for machine learning tasks.
For image classification, [MobileNet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet) is used. It is a small, low-latency, low-power models parameterized to meet the resource constraints of a variety of use cases.
For object detection, [coco-ssd](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd) is used. The model is capable of detecting 80 classes of objects. (SSD stands for Single Shot MultiBox Detection).

## 🚀 Quick Start

1. Install [Node.js](https://nodejs.org/) (comes with npm)
2. Clone this repo using `git clone https://github.com/PG26Alisa/AI-Embedded.git`
3. Move to the appropriate directory: `cd AI-Embedded`<br>
4. Run `npm install` in order to install dependencies.<br>
5. Run `npm run dev` to see the example in action.<br>
6. Navigate to [http://localhost:5173](http://localhost:5173) or [http://localhost:3000](http://localhost:3000) depends on your setting, and you'll see a basic React app running.
7. Open up `src/App.tsx` in your favorite editor and start editing. Save to see hot module reloading in action.
