import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'site' },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model('SiteSettings', SiteSettingsSchema);
