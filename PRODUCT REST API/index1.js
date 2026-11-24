console.log("index.js started");
import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());

// Read products from product.json
const readProducts = () => {
    const data = fs.readFileSync("product.json", "utf-8");
    return JSON.parse(data);
};

// Write products to product.json
const writeProducts = (products) => {
    fs.writeFileSync("product.json", JSON.stringify(products, null, 2));
};

// -------------------- GET ALL PRODUCTS --------------------

app.get("/products", (req, res) => {
    const products = readProducts();
    res.status(200).json(products);
});

// -------------------- GET PRODUCT BY ID --------------------

app.get("/products/:id", (req, res) => {

    const products = readProducts();

    const product = products.find(
        p => p.id == req.params.id
    );

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

// -------------------- ADD PRODUCT --------------------

app.post("/products", (req, res) => {

    const products = readProducts();

    const newProduct = req.body;

    products.push(newProduct);

    writeProducts(products);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});

// -------------------- UPDATE PRODUCT --------------------

app.put("/products/:id", (req, res) => {

    const products = readProducts();

    const index = products.findIndex(
        p => p.id == req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products[index] = req.body;

    writeProducts(products);

    res.status(200).json({
        message: "Product updated successfully",
        product: products[index]
    });

});

// -------------------- DELETE PRODUCT --------------------

app.delete("/products/:id", (req, res) => {

    const products = readProducts();

    const index = products.findIndex(
        p => p.id == req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(index, 1);

    writeProducts(products);

    res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });

});

// -------------------- SERVER --------------------

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
