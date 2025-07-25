import express from 'express';
import Order from '../models/Order';

const router = express.Router();

// API for creating orders
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'הזמנה נשמרה בהצלחה' });
    console.log('Order received:', req.body); // check
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בשמירת ההזמנה' });
  }
});

export default router;
