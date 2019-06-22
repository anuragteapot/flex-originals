"use strict";

var multer = require("multer");
var fs = require("fs-extra");

module.exports = function(Action) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      var dirPath = "uploads/";
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
      cb(null, dirPath + "/");
    },

    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  Action.upload = (req, res) => {
    var upload = multer({
      storage: storage
    }).single("file");

    upload(req, res, function(err) {
      if (err) {
        return res.json(err);
      } else {
        return res.json({
          res: "done"
        });
      }
    });
  };

  Action.remoteMethod("upload", {
    description: "Upload a file",
    accepts: [
      { arg: "req", type: "object", http: { source: "req" } },
      { arg: "res", type: "object", http: { source: "res" } }
    ],
    returns: {
      arg: "result",
      type: "string"
    },
    http: { verb: "post" }
  });
};
