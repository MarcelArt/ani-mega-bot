const { google } = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

const getVideosByChannelId = async (channelId) => {
  const videos = await youtube.search.list({
    part: 'snippet',
    channelId,
    order: 'date',
  });

  return videos.data;
}

module.exports = {
  getVideosByChannelId,
}