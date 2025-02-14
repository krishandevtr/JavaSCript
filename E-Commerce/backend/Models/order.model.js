import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            Product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }, price: {
                type: Number,
                required: true,
                min: 0
            },
        }
    ],

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    stripeSessionId: {
        type: String,
        unique: true
    },
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;