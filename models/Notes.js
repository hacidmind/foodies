const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add title'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot exceed 40 characters']
    },
    origin: {
        type: String,
        default: 'Unknown Origin',
        unique: true,
        trim: true,
        maxlength: [40, 'Origin cannot exceed 40 characters']
    },
    Description: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema)