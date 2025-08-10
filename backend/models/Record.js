import mongoose from 'mongoose';

const RecordEntrySchema = new mongoose.Schema({
  event: { type: String, required: true },
  record: { type: String, required: true },      // e.g. "10.8s" or "7.2m"
  athlete: { type: String, required: true },
  year: { type: Number, required: true }
}, { _id: false });

const RecordSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g. "best", "2023"
  track: [RecordEntrySchema],
  field: [RecordEntrySchema]
}, { timestamps: true });

export default mongoose.model('Record', RecordSchema);