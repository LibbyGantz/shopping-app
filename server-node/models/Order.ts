import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customer: {
    name: String,
    address: String,
    email: String,
  },
  items: [
    {
      id: Number,
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);
