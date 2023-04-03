class Angles {
    #alpha;
    #beta;
    #gamma;

    constructor(alpha, beta, gamma) {
        if (isNaN(alpha)) {
            throw TypeError('alpha is not a number');
        }
        if (isNaN(beta)) {
            throw TypeError('beta is not a number');
        }
        if (isNaN(gamma)) {
            throw TypeError('gamma is not a number');
        }

        this.#alpha = alpha;
        this.#beta = beta;
        this.#gamma = gamma;
    }

    get alpha() {
        return this.#alpha;
    }

    get beta() {
        return this.#beta;
    }

    get gamma() {
        return this.#gamma;
    }

    set alpha(val) {
        if (isNaN(val)) {
            throw TypeError('value is not a number');
        }

        this.#alpha = val;
    }

    set beta(val) {
        if (isNaN(val)) {
            throw TypeError('value is not a number');
        }

        this.#beta = val;
    }

    set gamma(val) {
        if (isNaN(val)) {
            throw TypeError('value is not a number');
        }
        
        this.#gamma = val;
    }

    toString(places=-1, degrees=false) {
        let a, b, c;
        if (degrees) {
            a = this.#alpha * 180 / Math.PI;
            b = this.#beta * 180 / Math.PI;
            c = this.#gamma * 180 / Math.PI;
        } else {
            a = this.#alpha;
            b = this.#beta;
            c = this.#gamma;
        }
        if (places >= 0) {
            a = a.toFixed(places);
            b = b.toFixed(places);
            c = c.toFixed(places);
        }
        return `[ ${a}, ${b}, ${c} ]`;
    }

    toObject() {
        return {alpha: this.#alpha, beta: this.#beta, gamma: this.#gamma};
    }
}

module.exports.Angles = Angles;
