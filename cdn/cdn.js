const fs = require('fs-extra');

exports.serveVideo = (req, res, next) => {
  const { mimetype, id, media, expires } = req.query;
  const path = Buffer.from(media, 'base64').toString('ascii');

  if (!mimetype || !id || !media) {
    return next({
      status: 404,
      message: 'Fucked Up!',
    });
  }

  fs.readFile(path, err => {
    if (err) {
      return next({
        status: 404,
        message: 'Fucked Up!',
      });
    } else {
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const { range } = req.headers;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(path, {
          start,
          end,
        });

        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Cache-Control': `private, max-age=${expires || '5000'}`,
          'Content-Length': chunksize,
          'Content-Type': mimetype,
        };

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Cache-Control': `private, max-age=${expires || '5000'}`,
          'Content-Type': mimetype,
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
      }
    }
  });
};

exports.serveImage = (req, res, next) => {
  const { mimetype, media, expires } = req.query;
  const path = Buffer.from(media, 'base64').toString('ascii');

  if (!mimetype || !media) {
    return next({
      status: 404,
      message: 'Fucked Up!',
    });
  }

  fs.readFile(path, err => {
    if (err) {
      return next({
        status: 404,
        message: 'Fucked Up!',
      });
    } else {
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const { range } = req.headers;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(path, {
          start,
          end,
        });

        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Cache-Control': `private, max-age=${expires || '5000'}`,
          'Content-Length': chunksize,
          'Content-Type': mimetype,
        };

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': mimetype,
          'Cache-Control': `private, max-age=${expires || '5000'}`,
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
      }
    }
  });
};
