import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { protect } from '../middleware/auth.js';
import defaultSiteSettings from '../data/defaultSiteSettings.js';

const router = express.Router();

async function ensureSettingsExist() {
  const doc = await SiteSettings.findOne({ key: 'site' });

  if (!doc) {
    const created = await SiteSettings.create({ key: 'site', data: defaultSiteSettings });
    return created.toObject();
  }

  if (!doc.data || !Object.keys(doc.data).length) {
    doc.data = defaultSiteSettings;
    await doc.save();
  }

  return doc.toObject();
}

router.get('/', async (req, res) => {
  try {
    const doc = await ensureSettingsExist();
    res.json(doc?.data || defaultSiteSettings);
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
