'use strict';

module.exports = function(Audio) {
  Audio.publish = async (id, audioData) => {
    if (!id) {
      throw new Error('User Id is required.', {}, 500);
    }

    let audio = await Audio.findOne({
      where: { id }
    });

    audio.name = audioData.name;
    audio.audioMeta = audioData.audioMeta;
    audio.audioFile = audioData.audioFile;
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
};
