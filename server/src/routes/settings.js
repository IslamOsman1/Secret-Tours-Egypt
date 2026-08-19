import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const doc = await SiteSettings.findOne({ key: 'site' }).lean();
    res.json(doc?.data || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const doc = await SiteSettings.findOneAndUpdate(
      { key: 'site' },
      { key: 'site', data: req.body || {} },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    res.json(doc.data || {});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
