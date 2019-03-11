let training_data = [{
    inputs: [0, 0],
    outputs: [0]
  },
  {
    inputs: [0, 1],
    outputs: [1]
  },
  {
    inputs: [1, 0],
    outputs: [1]
  },
  {
    inputs: [1, 1],
    outputs: [0]
  }
];

let nn = new NeuralNetwork(2, 4, 1);

function setup() {


    let input = [1, 0];

    // let output = nn.feedForward(input);




    // console.log(nn.feedForward([1, 0]));
    // console.log(nn.feedForward([1, 0]));
    // console.log(nn.feedForward([0, 0]));
    // console.log(nn.feedForward([1, 1]));

    // console.log(nn.predict([1, 0]));
    // console.log(nn.predict([1, 0]));
    // console.log(nn.predict([0, 0]));
    // console.log(nn.predict([1, 1]));
    

}


function draw() {
    nn.setLearningRate(0.1);

    // console.log(output);
    for (let i = 0; i < 100; i++) {
        let data = random(training_data);
        nn.train(data.inputs, data.outputs);
      }    

}