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

const VIDEO_EXT = ['video/mp4', 'video/x-msvideo'];
const AUDIO_EXT = ['audio/mpeg', 'audio/vnd.wav', 'audio/mp4', 'audio/ogg',  "audio/mp3"];
const IMAGE_EXT = [
  'image/gif',
  'image/jpeg',
  'image/svg+xml',
  'image/x-icon',
  'image/png'
];
const EXTENSION = ['.png', '.jpeg', '.mp4', '.mp3', '.ogg', '.gif'];
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
    const upload = multer({
      storage: s3Storage,
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
        req.file.path = req.file.location;
        try {
          if (type == 'video' && VIDEO_EXT.indexOf(req.file.mimetype) !== -1) {
            const video = await Videos.create({
              videoOwnerId: req.params.id,
              videoFile: req.file.path,
              name: req.file.originalname,
              videoMeta: req.file
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
              name: req.file.originalname,
              audioMeta: req.file
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
        } catch (err) {
          return res.json(err);
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
            size: '170x100',
            count: 3
          });

          const thumb = await tg.generate();
          const thumbnails = thumb.map(x =>
            path.join(video.videoMeta.destination, x)
          );
          return { thumbnails };
        } catch (err) {
          throw new Error('File must be video type.', {}, 500);
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
        fields: {
          videoOwnerId: true,
          id: true,
          name: true,
          videoFile: true,
          thumbImage: true
        },
        where: { videoOwnerId: id, visibility: 1 },
        limit: limit
      });
      const audio = await Audios.find({
        fields: {
          audioOwnerId: true,
          id: true,
          name: true,
          audioFile: true,
          thumbImage: true
        },
        where: { audioOwnerId: id, visibility: 1 },
        limit: limit
      });
      return { video, audio, user, settings };
    } else {
      const video = await Videos.find({
        fields: { id: true, name: true, videoFile: true, thumbImage: true },
        where: { visibility: 1 },
        limit: limit / 2
      });
      const audio = await Audios.find({
        fields: { id: true, name: true, audioFile: true, thumbImage: true },
        where: { visibility: 1 },
        limit: limit / 2
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
        totalStorage += value.videoMeta.size;
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

    if (id) {
      return await Videos.findOne({
        fields: {
          videoOwnerId: true,
          id: true,
          name: true,
          videoFile: true,
          thumbImage: true
        },
        where: { id, visibility: 1 }
      });
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
};
