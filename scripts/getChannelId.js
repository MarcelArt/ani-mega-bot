require('dotenv').config();
const fs = require('fs');
const { google } = require('googleapis');

const part = [
  'contentDetails',
  'id',
  'liveStreamingDetails',
  'localizations',
  'player',
  'recordingDetails',
  'snippet',
  'statistics',
  'status',
  'topicDetails',
].join(',');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

// node ./scripts/getChannelId
const getChannelId = async () => {
  const ANI_ONE_VIDEO_ID = 'c0aD8K5xY2o';
  const MUSE_ASIA_VIDEO_ID = 'utibxP7HSMM';
  const channel = await youtube.videos.list({
    part,
    id: ANI_ONE_VIDEO_ID,
  });

  fs.writeFileSync('./scripts/script_results/getChannelId.json', JSON.stringify(channel, null, 2));
}

getChannelId();