'use strict';

const multer = require('multer');
const fs = require('fs-extra');
const helper = require('./../../server/helper-util');
const path = require('path');
const app = require('../../server/server');

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
    const upload = multer({
      storage: storage
    }).single('file');

    upload(req, res, async err => {
      if (err) {
        return res.json(err);
      } else {
        try {
          const video = await Videos.create({
            videoOwnerId: req.params.id,
            videoFile: req.file.path,
            name: req.file.originalname,
            videoMeta: req.file
          });
          return res.json({
            video
          });
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
