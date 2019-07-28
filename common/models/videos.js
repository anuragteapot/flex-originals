'use strict';

module.exports = function(Videos) {
  Videos.publish = async (id, videoData) => {
    if (!id) {
      throw new Error('User Id is required.', {}, 500);
    }

    let video = await Videos.findOne({
      where: { id }
    });

    video.name = videoData.name;
    video.visibility = videoData.visibility;
    video.description = videoData.description;
    video.thumbImage = videoData.thumbImage;
    video.tags = videoData.tags;
    video.playlist = videoData.playlist;
    video.location = videoData.location;
    video.category = videoData.category;
    video.allowComments = videoData.allowComments;
    video.agerestriction = videoData.agerestriction;
    video.ratings = videoData.ratings;
    video.licence = videoData.licence;
    video.likedPrivate = videoData.likedPrivate;

    return video.save();
  };

  Videos.remoteMethod('publish', {
    description: 'Method to publish the video.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true
      },
      {
        arg: 'videoData',
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
