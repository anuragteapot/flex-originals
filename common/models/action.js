/* eslint-disable no-unused-vars */
'use strict';

const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const fs = require('fs-extra');
const helper = require('./../../server/helper-util');
const path = require('path');
const app = require('../../server/server');
const ThumbnailGenerator = require('../../server/API/Video');

const VIDEO_EXT = [
  'video/mp4',
  'video/x-msvideo',
  'video/avi',
  'application/x-troff-msvideo',
  'video/msvideo'
];
const AUDIO_EXT = [
  'audio/mpeg',
  'audio/vnd.wav',
  'audio/mp4',
  'audio/ogg',
  'audio/mp3'
];
const IMAGE_EXT = [
  'image/gif',
  'image/jpeg',
  'image/jpg',
  'image/svg+xml',
  'image/x-icon',
  'image/png'
];
const EXTENSION = [
  '.png',
  '.jpeg',
  '.mp4',
  '.mp3',
  '.ogg',
  '.gif',
  '.jpg',
  '.avi'
];
/**
 * PROFILE IMAGE STORING STARTS
 */
const s3 = new aws.S3({
  accessKeyId: 'AKIA5HHMIXVQQUAJ7PQC',
  secretAccessKey: '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',
  Bucket:
    process.env.NODE_ENV === 'production'
      ? 'flexoriginals'
      : 'dev-flexoriginals'
});

module.exports = function(Action) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userId = req.params.id;
      const dirPath = `uploads/${userId}`;
      fs.ensureDir('uploads', err => {
        console.log(err);
      });
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
      const sectionPath = path.join(dirPath, helper.randomId());
      fs.mkdirSync(sectionPath);
      const filePath = path.join(sectionPath, req.params.type);
      fs.mkdirSync(filePath);
      cb(null, filePath);
    },

    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const s3Storage = multerS3({
    s3: s3,
    bucket:
      process.env.NODE_ENV === 'production'
        ? 'flexoriginals'
        : 'dev-flexoriginals',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function(req, file, cb) {
      const userId = req.params.id;
      const dirPath = `uploads/${userId}/${helper.randomId()}/${
        req.params.type
      }/`;
      cb(
        null,
        dirPath +
          path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  });

  Action.upload = (req, res) => {
    const Videos = app.models.Videos;
    const Audios = app.models.Audio;
    const videoAnalytic = app.models.videoAnalytic;
    const audioAnalytic = app.models.audioAnalytic;
    const upload = multer({
      storage: storage,
      fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname);
        if (EXTENSION.indexOf(ext) == -1) {
          return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 1024
      }
    }).single('file');

    upload(req, res, async err => {
      if (err) {
        return res.json(err);
      } else {
        const { type } = req.params;
        req.file.path = req.file.path || req.file.location;
        try {
          if (type == 'video' && VIDEO_EXT.indexOf(req.file.mimetype) !== -1) {
            const video = await Videos.create({
              videoOwnerId: req.params.id,
              videoFile: req.file.path,
              title: req.file.originalname,
              videoMeta: req.file
            });

            await videoAnalytic.create({
              videoId: video.id
            });

            return res.json({
              video
            });
          } else if (
            type === 'image' &&
            IMAGE_EXT.indexOf(req.file.mimetype) !== -1
          ) {
            return res.json({
              res: req.file
            });
          } else if (
            type === 'audio' &&
            AUDIO_EXT.indexOf(req.file.mimetype) !== -1
          ) {
            const audio = await Audios.create({
              audioOwnerId: req.params.id,
              audioFile: req.file.path,
              title: req.file.originalname,
              audioMeta: req.file
            });

            await audioAnalytic.create({
              audioId: audio.id
            });

            return res.json({
              audio
            });
          } else {
            return res.json({
              err: 400,
              message: 'File not allowed'
            });
          }
        } catch (error) {
          return res.json({
            err: 500,
            message: 'Server Internal Error',
            error
          });
        }
      }
    });
  };

  Action.remoteMethod('upload', {
    description: 'Upload a file',
    accepts: [
      { arg: 'req', type: 'object', http: { source: 'req' } },
      { arg: 'res', type: 'object', http: { source: 'res' } },
      {
        arg: 'id',
        type: 'string',
        required: true
      },
      {
        arg: 'type',
        type: 'string',
        required: true
      }
    ],
    returns: {
      arg: 'result',
      type: 'string'
    },
    http: { path: '/upload/:type/:id', verb: 'post' }
  });

  Action.genrateThumbnail = async id => {
    const Videos = app.models.Videos;

    try {
      let video = await Videos.findOne({
        where: { id }
      });

      if (VIDEO_EXT.indexOf(video.videoMeta.mimetype) !== -1) {
        try {
          const tg = new ThumbnailGenerator({
            sourcePath: video.videoMeta.path,
            destinationPath: video.videoMeta.destination,
            size: '190x110',
            count: 4
          });

          const thumb = await tg.generate();
          const thumbnails = thumb.map(x =>
            path.join(video.videoMeta.destination, x)
          );
	          // const gif = await tg.generateGif({});
          return { thumbnails };
        } catch (err) {
          throw new Error('File must be video type.');
        }
      } else {
        return { thumbnails: [] };
      }
    } catch (err) {
      return { err };
    }
  };

  Action.remoteMethod('genrateThumbnail', {
    description: 'Method to create video thumnails.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/genrateThumbnail/:id',
      verb: 'get'
    }
  });

  Action.processVideo = async id => {
    const Videos = app.models.Videos;

    try {
      let video = await Videos.findOne({
        where: { id }
      });

      if (video.videoMeta) {
        try {
          const tg = new ThumbnailGenerator({
            sourcePath: video.videoMeta.path,
            destinationPath: video.videoMeta.destination,
            size: '200x200',
            count: 3
          });

          const compressVideo = await tg.resizeVideo(720);
       //   console.log(await tg.generateGif({}));
          return { compressVideo };
        } catch (err) {
          return { err };
        }
      } else {
        return { compressVideo: '' };
      }
    } catch (err) {
      return { err };
    }
  };

  Action.remoteMethod('processVideo', {
    description: 'Method to process video and generate lower version.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/processVideo/:id',
      verb: 'get'
    }
  });

  Action.getContent = async (id, limit) => {
    const Videos = app.models.Videos;
    const Audios = app.models.Audio;
    const User = app.models.User;
    const Settings = app.models.Settings;

    if (id) {
      const user = await User.findOne({
        fields: {
          id: true,
          username: true,
          realm: true,
          email: true
        },
        where: { id }
      });

      if (!user) {
        throw new Error('User not found.', {}, 404);
      }

      const settings = await Settings.findOne({
        fields: {
          id: true,
          verifiedChannel: true,
          followers: true,
          profileAvatar: true,
          facebook: true,
          instagram: true,
          redit: true,
          twitter: true,
          linkedin: true
        },
        where: { ownerId: user.id }
      });

      const video = await Videos.find({
        include: ['videoAnalytics', 'user'],
        order: 'published DESC',
        fields: {
          published: true,
          videoOwnerId: true,
          id: true,
          title: true,
          thumbImage: true
        },
        where: { videoOwnerId: id, visibility: { lt: 2 } },
        limit: limit
      });
      const audio = await Audios.find({
        include: ['audioAnalytics', 'user'],
        order: 'published DESC',
        fields: {
          published: true,
          audioOwnerId: true,
          id: true,
          title: true,
          audioFile: true,
          thumbImage: true
        },
        where: { audioOwnerId: id, visibility: { lt: 2 } },
        limit: limit
      });
      return { video, audio, user, settings };
    } else {
      const video = await Videos.find({
        include: ['videoAnalytics', 'user'],
        order: 'published DESC',
        fields: {
          published: true,
          videoOwnerId: true,
          id: true,
          title: true,
          thumbImage: true
        },
        where: { visibility: 1 },
        limit: limit
      });
      const audio = await Audios.find({
        include: ['audioAnalytics', 'user'],
        order: 'published DESC',
        fields: {
          published: true,
          audioOwnerId: true,
          id: true,
          title: true,
          audioFile: true,
          thumbImage: true
        },
        where: { visibility: 1 },
        limit: limit
      });
      return { video, audio };
    }
  };

  Action.remoteMethod('getContent', {
    description: 'Method to process video and generate lower version.',
    accepts: [
      {
        arg: 'id',
        type: 'string'
      },
      {
        arg: 'limit',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/getContent/:limit/:id?',
      verb: 'get'
    }
  });

  Action.getUserStorage = async id => {
    const Videos = app.models.Videos;
    const Audios = app.models.Audio;

    if (id) {
      const video = await Videos.find({
        fields: { videoMeta: true },
        where: { videoOwnerId: id }
      });
      const audio = await Audios.find({
        fields: { audioMeta: true },
        where: { audioOwnerId: id }
      });

      let totalStorage = 0;
      video.forEach(value => {
        totalStorage += value.videoMeta.size;
      });
      audio.forEach(value => {
        totalStorage += value.audioMeta.size;
      });
      return { totalStorage };
    }
  };

  Action.remoteMethod('getUserStorage', {
    description: 'Method to get the user storage.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/getUserStorage/:id',
      verb: 'get'
    }
  });

  Action.getVideo = async id => {
    const Videos = app.models.Videos;
    const videoAnalytic = app.models.videoAnalytic;
    const User = app.models.User;
    const Settings = app.models.Settings;

    if (id) {
      const analytic = await videoAnalytic.findOne({
        where: { videoId: id }
      });

      const video = await Videos.findOne({
        fields: {
          videoOwnerId: true,
          id: true,
          published: true,
          name: true,
          title: true,
          videoFile: true,
          thumbImage: true,
          description: true,
          licence: true,
          likedPrivate: true,
          ratings: true,
          agerestriction: true,
          allowComments: true
        },
        where: { id, visibility: 1 }
      });

      if (!video) {
        throw new Error('Video not found.', {}, 404);
      }

      const user = await User.findOne({
        fields: {
          id: true,
          username: true,
          realm: true
        },
        where: { id: video.videoOwnerId }
      });

      if (!user) {
        throw new Error('User not found.', {}, 404);
      }

      const settings = await Settings.findOne({
        fields: {
          verifiedChannel: true,
          followers: true,
          profileAvatar: true
        },
        where: { ownerId: user.id }
      });

      return { video, analytic, settings, user };
    }
  };

  Action.remoteMethod('getVideo', {
    description: 'Method to get the video info.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/getVideo/:id',
      verb: 'get'
    }
  });

  Action.getAudio = async id => {
    const Audio = app.models.Audio;
    const audioAnalytic = app.models.audioAnalytic;

    if (id) {
      const analytic = await audioAnalytic.findOne({
        where: { audioId: id }
      });

      const audio = await Audio.findOne({
        fields: {
          audioOwnerId: true,
          id: true,
          name: true,
          published: true,
          audioFile: true,
          thumbImage: true
        },
        where: { id, visibility: 1 }
      });

      return { analytic, audio };
    }
  };

  Action.remoteMethod('getAudio', {
    description: 'Method to get the audio info.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/getAudio/:id',
      verb: 'get'
    }
  });
};
