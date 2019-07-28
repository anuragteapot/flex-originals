'use strict';

const multer = require('multer');
const fs = require('fs-extra');
const helper = require('./../../server/helper-util');
const path = require('path');
const app = require('../../server/server');

const VIDEO_EXT = ['video/mp4', 'video/x-msvideo'];
const AUDIO_EXT = ['audio/mpeg', 'audio/vnd.wav', 'audio/mp4', 'audio/ogg'];
const IMAGE_EXT = [
  'image/gif',
  'image/jpeg',
  'image/svg+xml',
  'image/x-icon',
  'image/png'
];
const EXTENSION = ['.png', '.jpeg', '.mp4', '.mp3', '.ogg', '.gif'];

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

  Action.upload = (req, res) => {
    const Videos = app.models.Videos;
    const Audios = app.models.Audio;
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
        fileSize: 1024 * 1024 * 1024 * 1024
      }
    }).single('file');

    upload(req, res, async err => {
      if (err) {
        return res.json(err);
      } else {
        const { type } = req.params;

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
          } else if (type === 'image' && IMAGE_EXT.indexOf(req.file.mimetype)!== -1) {
            return res.json({
              res: req.file
            });
          } else if (type === 'audio' && AUDIO_EXT.indexOf(req.file.mimetype) !== -1) {
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
};
