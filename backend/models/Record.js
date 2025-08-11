// models/Record.js
import mongoose from 'mongoose';

const RecordEntrySchema = new mongoose.Schema({
  event: { 
    type: String, 
    required: true, 
    trim: true 
  },
  record: { 
    type: String, 
    required: true, 
    trim: true 
    // Optionally: match: /^[0-9.]+(s|m)$/i for time/distance format
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
    max: new Date().getFullYear()
  }
}, { _id: false });

const RecordSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true,
    index: true // faster queries on category
  },
  track: { 
    type: [RecordEntrySchema], 
    default: [] 
  },
  field: { 
    type: [RecordEntrySchema], 
    default: [] 
  }
}, { timestamps: true });

export default mongoose.model('Record', RecordSchema);
