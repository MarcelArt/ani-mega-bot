require('dotenv').config();
const { CronJob } = require('cron');
const mongoose = require('mongoose');

const telegram = require('./services/telegram');
const { ANI_ONE_CHANNEL_ID, MUSE_ASIA_CHANNEL_ID } = require('./utils');
const { getVideosByChannelId } = require('./services/google');

const VideoModel = require('./models/video');

telegram.initTelegramBot();

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
  .then(() => {
    const jobMuseAsia = new CronJob(
      '* */1 * * *',
      async () => {
        const videos = await getVideosByChannelId(MUSE_ASIA_CHANNEL_ID);
        for (const video of videos.items.reverse()) {
          const existingVideo = await VideoModel.findOne({ videoId: video.id.videoId }).lean();
          if (existingVideo) continue;
          const newVideo = await VideoModel.create({
            videoId: video?.id.videoId,
            channelId: video?.snippet.channelId,
            title: video?.snippet.title,
            thumbnails: { 
              default: video?.snippet.thumbnails.default.url,
              medium: video?.snippet.thumbnails.medium.url,
              high: video?.snippet.thumbnails.high.url,
            },
            channelTitle: video?.snippet.channelTitle,
            url: `https://www.youtube.com/watch?v=${video?.id.videoId}`,
          })
          telegram.sendMessageWithImage(process.env.MY_CHAT_ID, newVideo.thumbnails.high, `${newVideo.title} ${newVideo.url}`);
          console.log('SENT VIDEO NOTIF');
        }
      },
      null,
      true,
      'Asia/Makassar'
    );
    
    const jobAniOne = new CronJob(
      '* */1 * * *',
      async () => {
        const videos = await getVideosByChannelId(ANI_ONE_CHANNEL_ID);
        for (const video of videos.items.reverse()) {
          const existingVideo = await VideoModel.findOne({ videoId: video.id.videoId }).lean();
          if (existingVideo) continue;
          const newVideo = await VideoModel.create({
            videoId: video?.id.videoId,
            channelId: video?.snippet.channelId,
            title: video?.snippet.title,
            thumbnails: { 
              default: video?.snippet.thumbnails.default.url,
              medium: video?.snippet.thumbnails.medium.url,
              high: video?.snippet.thumbnails.high.url,
            },
            channelTitle: video?.snippet.channelTitle,
            url: `https://www.youtube.com/watch?v=${video?.id.videoId}`,
          })
          telegram.sendMessageWithImage(process.env.MY_CHAT_ID, newVideo.thumbnails.high, `${newVideo.title} ${newVideo.url}`);
          console.log('SENT VIDEO NOTIF');
        }
      },
      null,
      true,
      'Asia/Makassar'
    );
    
    jobMuseAsia.start();
    jobAniOne.start();
  })
  .catch(console.log);

