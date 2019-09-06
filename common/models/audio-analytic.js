'use strict';

module.exports = function(audioAnalytic) {
  audioAnalytic.updateViews = async id => {
    if (!id) {
      throw new Error('audio Id is required.', {}, 500);
    }

    let audio = await audioAnalytic.findOne({
      where: { audioId: id }
    });

    if (!audio) {
      throw new Error('audio Id is required.');
    }

    audio.views = audio.views + 1;

    return audio.save();
  };

  audioAnalytic.remoteMethod('updateViews', {
    description: 'Method to update views the audio.',
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
      path: '/updateViews',
      verb: 'post'
    }
  });

  audioAnalytic.updateShare = async id => {
    if (!id) {
      throw new Error('audio Id is required.');
    }

    let audio = await audioAnalytic.findOne({
      where: { audioId: id }
    });

    if (!audio) {
      throw new Error('audio Id is required.');
    }

    audio.share = audio.share + 1;

    return audio.save();
  };

  audioAnalytic.remoteMethod('updateShare', {
    description: 'Method to update views the audio.',
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
      path: '/updateShare',
      verb: 'post'
    }
  });

  audioAnalytic.updateReport = async id => {
    if (!id) {
      throw new Error('audio Id is required.');
    }

    let audio = await audioAnalytic.findOne({
      where: { audioId: id }
    });

    if (!audio) {
      throw new Error('audio Id is required.');
    }

    audio.report = audio.report + 1;

    return audio.save();
  };

  audioAnalytic.remoteMethod('updateReport', {
    description: 'Method to update views the audio.',
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
      path: '/updateReport',
      verb: 'post'
    }
  });
};
