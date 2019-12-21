'use strict';

module.exports = function(videoAnalytic) {
  videoAnalytic.updateViews = async id => {
    if (!id) {
      throw new Error('video Id is required.', {}, 500);
    }

    let video = await videoAnalytic.findOne({
      where: { videoId: id },
    });

    if (!video) {
      throw new Error('Video Id is required.', {}, 404);
    }

    video.views = video.views + 1;

    return video.save();
  };

  videoAnalytic.remoteMethod('updateViews', {
    description: 'Method to update views the video.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true,
      },
    ],
    returns: {
      type: 'object',
      root: true,
    },
    http: {
      path: '/updateViews',
      verb: 'post',
    },
  });

  videoAnalytic.updateShare = async id => {
    if (!id) {
      throw new Error('Video Id is required.', {}, 500);
    }

    let video = await videoAnalytic.findOne({
      where: { videoId: id },
    });

    if (!video) {
      throw new Error('Video Id is required.', {}, 404);
    }

    video.share = video.share + 1;

    return video.save();
  };

  videoAnalytic.remoteMethod('updateShare', {
    description: 'Method to update views the video.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true,
      },
    ],
    returns: {
      type: 'object',
      root: true,
    },
    http: {
      path: '/updateShare',
      verb: 'post',
    },
  });

  videoAnalytic.updateReport = async id => {
    if (!id) {
      throw new Error('Video Id is required.', {}, 500);
    }

    let video = await videoAnalytic.findOne({
      where: { videoId: id },
    });

    if (!video) {
      throw new Error('Video Id is required.', {}, 404);
    }

    video.report = video.report + 1;

    return video.save();
  };

  videoAnalytic.remoteMethod('updateReport', {
    description: 'Method to update views the video.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true,
      },
    ],
    returns: {
      type: 'object',
      root: true,
    },
    http: {
      path: '/updateReport',
      verb: 'post',
    },
  });
};
