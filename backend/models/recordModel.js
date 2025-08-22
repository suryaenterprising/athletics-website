import mongoose from 'mongoose';

// Schema for each entry in track/field
const RecordEntrySchema = new mongoose.Schema(
  {
    event: { type: String, required: true, trim: true },
    record: { 
      type: String, 
      required: true, 
      trim: true,
      match: /^(\d{1,2}:\d{2}(\.\d{1,2})?s|\d+(\.\d+)?(s|m|kg))$/i // more flexible
    },
    athlete: { type: String, required: true, trim: true },
    year: { 
      type: Number, 
      required: true,
      min: 1900,
      validate: {
        validator: v => v <= new Date().getFullYear(),
        message: props => `${props.value} is not a valid year`
      }
    }
  },
  { timestamps: true }
);

// Main Records schema — one document per category
const RecordSchema = new mongoose.Schema(
  {
    category: { 
      type: String, 
      required: true, 
      enum: ['boys', 'girls', 'men', 'women', 'mixed'],
      lowercase: true,
      trim: true,
      index: true
    },
    track: { type: [RecordEntrySchema], default: [] },
    field: { type: [RecordEntrySchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('Record', RecordSchema);
