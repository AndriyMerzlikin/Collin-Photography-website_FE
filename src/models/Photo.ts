import mongoose, { Schema } from 'mongoose';

const PhotoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    category: {
      type: String,
      enum: ['landscape', 'birds', 'mammals'],
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Photo =
  mongoose.models.Photo || mongoose.model('Photo', PhotoSchema);
