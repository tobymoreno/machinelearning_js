let sigmoid = (x) => 1 / (1 + Math.exp(-x));

let dsigmoid = (y) => y * (1 - y);

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        // weights between input and hidden
        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        // wegights between hidden and output
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);

        this.weights_ih.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1)
        this.bias_o = new Matrix(this.output_nodes, 1);

        this.bias_h.randomize();
        this.bias_o.randomize();

        this.learning_rate = 0.1;
    }

    feedForward(input_array) {

        // Generating the hidden outputs
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);

        // activate
        hidden.map(sigmoid);


        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);

        // activate
        output.map(sigmoid);


        return output.toArray();
    }

    train(input_array, target_array) {

        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);

        // activate
        hidden.map(sigmoid);


        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);

        // activate
        outputs.map(sigmoid);

        // Convert array to matrix
        // outputs = Matrix.fromArray(outputs);
        let targets = Matrix.fromArray(target_array)

        // Calculate the error
        // ERROR = TARGETS - OUTPUTS
        let output_errors = Matrix.subtract(targets, outputs);


        let gradients = Matrix.map(outputs, dsigmoid);
        gradients.multiply(output_errors);
        gradients.multiply(this.learning_rate);


        let hidden_T = Matrix.transpose(hidden);
        let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);

        this.weights_ho.add(weight_ho_deltas);
        this.bias_o.add(gradients)

        // Calculate the hidden layer errors
        let who_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors)

        let hidden_gradient = Matrix.map(hidden, dsigmoid);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learning_rate);



        // calculate input to hidden delta
        let input_T = Matrix.transpose(inputs);
        let weight_ih_deltas = Matrix.multiply(hidden_gradient, input_T)

        this.weights_ih.add(weight_ih_deltas);
        this.bias_h.add(hidden_gradient);

        // this.weights_ih.print();
    }
}