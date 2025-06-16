import { Router } from "express";
import Product from "../models/product.model";

const router = Router();

// Create a product
router.post("/", async (req, res) => {
    try {
        const { id, name, price } = req.body;
        const newProduct = new Product({ id, name, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({
            error: "Error creating product",
            details: error,
        });
    }
});

// Get all products
router.get("/", async (_req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({
            error: "Error fetching products",
            details: error,
        });
    }
});

export default router;