import mongoose from 'mongoose';

// Schema for each entry in track/field
const RecordEntrySchema = new mongoose.Schema(
  {
    event: { 
      type: String, 
      required: true, 
      trim: true 
    },
    record: { 
      type: String, 
      required: true, 
      trim: true
      // Optional strict format check:
      // match: /^[0-9.]+(s|m)$/i
    },
    athlete: { 
      type: String, 
      required: true, 
      trim: true 
    },
    year: { 
      type: Number, 
      required: true,
      min: 1900,
      validate: {
        validator: function (v) {
          return v <= new Date().getFullYear();
        },
        message: props => `${props.value} is not a valid year`
      }
    }
  },
  { _id: false }
);

// Main Records schema — one document per category
const RecordSchema = new mongoose.Schema(
  {
    category: { 
      type: String, 
      required: true, 
      trim: true, 
      lowercase: true,
      index: true // speeds up queries like GET /api/records?category=best
    },
    track: { 
      type: [RecordEntrySchema], 
      default: [] 
    },
    field: { 
      type: [RecordEntrySchema], 
      default: [] 
    }
  },
  { timestamps: true }
);

export default mongoose.model('Record', RecordSchema);