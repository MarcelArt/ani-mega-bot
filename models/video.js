const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: { type: String, default: '' },
  channelId: { type: String, default: '' },
  title: { type: String, default: '' },
  thumbnails: { 
    default: { type: String, default: '' },
    medium: { type: String, default: '' },
    high: { type: String, default: '' },
  },
  channelTitle: { type: String, default: '' },
  url: { type: String, default: '' },
});

module.exports = mongoose.model('video', videoSchema);