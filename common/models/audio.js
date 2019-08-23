'use strict';

module.exports = function(Audio) {
  Audio.publish = async (id, audioData) => {
    if (!id) {
      throw new Error('User Id is required.', {}, 500);
    }

    let audio = await Audio.findOne({
      where: { id }
    });

    audio.title = audioData.title;
    audio.visibility = audioData.visibility;
    audio.description = audioData.description;
    audio.thumbImage = audioData.thumbImage;
    audio.tags = audioData.tags;
    audio.playlist = audioData.playlist;
    audio.location = audioData.location;
    audio.category = audioData.category;
    audio.allowComments = audioData.allowComments;
    audio.agerestriction = audioData.agerestriction;
    audio.ratings = audioData.ratings;
    audio.licence = audioData.licence;
    audio.thumbnails = audioData.thumbnails;
    audio.likedPrivate = audioData.likedPrivate;

    return audio.save();
  };

  Audio.remoteMethod('publish', {
    description: 'Method to publish the audio.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true
      },
      {
        arg: 'audioData',
        type: 'object',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/publish',
      verb: 'post'
    }
  });

  Audio.deleteItem = async id => {
    if (!id) {
      throw new Error('User Id is required.', {}, 500);
    }

    let audio = await Audio.findOne({
      where: { id }
    });
    audio.visibility = 2;
    audio.save();
    return { message: 'Success' };
  };

  Audio.remoteMethod('deleteItem', {
    description: 'Method to delete the audio.',
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
      path: '/deleteItem',
      verb: 'post'
    }
  });

  Audio.getAudioInfo = async id => {
    if (!id) {
      throw new Error('User Id is required.', {}, 500);
    }

    return await Audio.findOne({
      where: { id }
    });
  };

  Audio.remoteMethod('getAudioInfo', {
    description: 'Method to get Audio Info',
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
      path: '/getAudioInfo/:id',
      verb: 'get'
    }
  });
};
