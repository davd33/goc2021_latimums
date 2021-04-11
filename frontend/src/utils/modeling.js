import { Model } from 'keras-js';
import sample from './sample';


document.addEventListener('DOMContentLoaded', () => {
  document.write('Loading...');
});

const model = new Model({
  filepath: 'CNNModel_feraligned+ck_5emo.bin'
});

model.ready()
  .then(() => model.predict({
    input: new Float32Array(sample),
  }))
  .then(({ output }) => {
    let predictionProbability = -1;
    let predictedDigit = null;
    Object.entries(output).forEach(([digit, probability]) => {
      if (probability > predictionProbability) {
        predictionProbability = probability;
        predictedDigit = digit;
      }
    });
    document.write(
      `Predicted ${predictedDigit} with probability ${predictionProbability.toFixed(3)}.`,
    );
  })
  .catch((error) => {
    console.log(error);
  });
