const model = tf.sequential();



const configHidden = {
    units: 4,
    // activation: 'sigmoid',
    inputShape: [2],
    useBias : true

}

const configOutput = {
    units: 1,
    activation: 'sigmoid',
    useBias : true
}

const hidden = tf.layers.dense(configHidden);

const output = tf.layers.dense(configOutput);

model.add(hidden);
model.add(output);

// create an optimizer
const optimizer = tf.train.sgd(0.1);

const config = {
    optimizer: optimizer,
    loss: tf.losses.meanSquaredError
}

model.compile(config);


// train the model


const xs = tf.tensor2d(
    [
        [0, 0],
        [0.5, 0.5],
        [1, 1],
        [0.75, 0.75]
    ]);

const x = [
    [0.25, 0.865],
    [0.25, 0.25],
    [0.4, 0.35],
    [0.8, 0.65]
];

const ys = tf.tensor2d(
    [
        [1],
        [0.5],
        [0],
        [.25]
    ]
)

//model.fit(xs, ys).then( h => console.log(h.history.loss) )

async function go() {
    const h = await model.fit(xs, ys, {
        epoch: 10000
    });

    let inputx = tf.tensor2d([
        [0.25, 0.865]
    ]);

    let prediction = model.predict(inputx);

    console.log(h.history.loss);

    prediction.print();

}

// go();

// const h = async () => await model.fit(xs, ys, {
//     Epoch : 10000
// });

// h();

(async () => {
    for (let i = 0; i < 1000; i++) {

        const h = await model.fit(xs, ys, {
            Epoch: 1000
        })
        console.log("Loss: " + h.history.loss[0]);
    }


})().then(() => {
    console.log("Training Complete.")
    let inputx = tf.tensor2d([
        [0.1, 0.1]
    ]);
    
    let prediction = model.predict(xs);
    
    console.log("Prediction: " + prediction);    
})

