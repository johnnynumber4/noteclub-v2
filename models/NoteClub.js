const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteClubSchema = new Schema({
  member: {
    type: String,
    required: true,
  },
  artist: {
      type: String,
      required: true,
  },
  album: {
      type: String,
      required: true,
  },
  theme: {
      type: String,
      required: false,
  },
}, { timestamps: true });

const NoteClub = mongoose.model('NoteClub', NoteClubSchema);
module.exports = NoteClub;
