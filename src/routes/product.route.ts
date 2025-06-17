import { Router } from "express";
import Product from "../models/product.model";

const router = Router();

// Create a product
router.post("/", async (req, res) => {
    try {
        const { id, name, price } = req.body;
        // Basic validation
        if (id == null || name == null || price == null) {
            return res.status(400).json({ error: "Missing required fields: id, name, price" });
        }
        const newProduct = new Product({ id, name, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        // Handle potential duplicate key errors
        if (error.code === 11000) {
            return res.status(409).json({
                error: "Product with this ID already exists",
                details: error,
            });
        }
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

// NEW: Get a single product by its numeric ID
router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        if (isNaN(productId)) {
            return res.status(400).json({ error: "Invalid product ID format. Must be a number." });
        }
        
        // Use the 'id' field you defined in your schema, not the default '_id'
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({
            error: "Error fetching product",
            details: error,
        });
    }
});


export default router;
