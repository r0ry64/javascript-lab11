class ProductProperties {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    getTotalValue() {
        return this.price * this.quantity;
    }

    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}`;
    }

    static applyDiscount(products, discount) {
        products.forEach(product => {
            product.price *= (1 - discount);
        });
    }
}

class PerishableProductProperties extends ProductProperties {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);
        this.expirationDate = expirationDate;
    }

    toString() {
        return `${super.toString()}, Expiration Date: ${this.expirationDate}`;
    }
}

class Store {
    constructor() {
        this.inventory = [];
    }

    addProduct(product) {
        this.inventory.push(product);
    }

    getInventoryValue() {
        return this.inventory.reduce((total, product) => total + product.getTotalValue(), 0);
    }

    findProductByName(name) {
        return this.inventory.find(product => product.name === name) || null;
    }

    printInventory() {
        console.log("Inventory:");
        this.inventory.forEach(product => {
            console.log(product.toString());
        });
    }
}

const hwnPizza = new ProductProperties("Hawaiian Pizza", 10.0, 2);
const chickenNug = new ProductProperties("Chicken Nuggets", 0.5, 30);
const hotDog = new ProductProperties("Hot Dog", 1.0, 100);
const milk = new PerishableProductProperties("Milk", 1.5, 10, "2024-12-31");
const avocado = new PerishableProductProperties("Avocado", 4.0, 5, "2024-12-15");

const store = new Store();
store.addProduct(hwnPizza);
store.addProduct(chickenNug);
store.addProduct(hotDog);
store.addProduct(milk);
store.addProduct(avocado);

store.printInventory();

console.log("Total inventory value before discount: $" + store.getInventoryValue().toFixed(2));

ProductProperties.applyDiscount(store.inventory, 0.15);

console.log("Total inventory value after discount: $" + store.getInventoryValue().toFixed(2));

const productName = "Milk";
const foundProduct = store.findProductByName(productName);
if (foundProduct) {
    console.log(`Found product: ${foundProduct.toString()}`);
} else {
    console.log(`Product with name '${productName}' was not found!!`);
}