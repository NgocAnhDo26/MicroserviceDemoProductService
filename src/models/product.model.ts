import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    id: number;
    name: string;
    price: number;
}

const ProductSchema: Schema = new Schema<IProduct>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);