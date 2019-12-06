let model;
const webcamElement = document.getElementById('webcam');

async function app() {
  console.log('Loading model...');

  // Load the model.
  net = await tf.loadLayersModel('model/model.json');
  console.log('Successfully loaded model');

  // Create an object from Tensorflow.js data API which could capture image
  // from the web camera as Tensor.
  const webcam = await tf.data.webcam(webcamElement);

  while (true) {
    const img = await webcam.capture();
    const result = await net.classify(img);

    document.getElementById('console').innerText = `
      prediction: ${result[0].className}\n
      probability: ${result[0].probability}
    `;
    // Dispose the tensor to release the memory.
    img.dispose();

    // Give some breathing room by waiting for the next animation frame to
    // fire.
    await tf.nextFrame();
  }

}

app();

/*
const model = tf.loadLayersModel('model/model.json');


function isSmiling()
{

}

// import * as tf from '@tensorflow/tfjs';
//const model = await tf.loadLayersModel('model/model.json');

const example = tf.fromPixels(webcamElement);  // for example
const prediction = model.predict(example);

*/
