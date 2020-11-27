class Cart {
    constructor() {
        this._cart = []
    }
    total() {
        return this._cart.reduce((acc, v) => acc + v.price, 0);
    }
    addToCart(item) {
        this._cart.push(item);
    }
}

module.exports = Cart;