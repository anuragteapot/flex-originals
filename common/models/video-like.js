'use strict';

module.exports = function(Videolike) {
  Videolike.likeEndpoint = async (userId, videoId, reaction) => {
    const video = await Videolike.findOne({
      where: {
        videoUserLike: userId,
        videoId: videoId
      }
    });

    if (video) {
      video.reaction = reaction;
      video.save();
      return { SUCCESS: true, REACTION: reaction };
    } else {
      await Videolike.create({
        videoUserLike: userId,
        videoId: videoId,
        reaction: reaction
      });
      return { SUCCESS: true, REACTION: reaction };
    }
  };

  Videolike.remoteMethod('likeEndpoint', {
    description: 'Method to like or unlike video',
    accepts: [
      {
        arg: 'userId',
        type: 'string',
        required: true
      },
      {
        arg: 'videoId',
        type: 'string',
        required: true
      },
      {
        arg: 'reaction',
        type: 'number',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/likeEndpoint',
      verb: 'post'
    }
  });

  Videolike.getLike = async (userId, videoId) => {
    const video = await Videolike.findOne({
      where: {
        videoUserLike: userId,
        videoId: videoId
      }
    });

    if (video) {
      return { SUCCESS: true, REACTION: video.reaction };
    } else {
      return { SUCCESS: true, REACTION: 0 };
    }
  };

  Videolike.remoteMethod('getLike', {
    description: 'Method to get follow',
    accepts: [
      {
        arg: 'userId',
        type: 'string',
        required: true
      },
      {
        arg: 'videoId',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/getLike/:userId/:videoId',
      verb: 'get'
    }
  });

  Videolike.getTotalLike = async videoId => {
    const video = await Videolike.findOne({
      where: {
        videoId: videoId
      }
    });

    if (video) {
      return { SUCCESS: true, REACTION: video.reaction };
    } else {
      return { SUCCESS: true, REACTION: 0 };
    }
  };

  Videolike.remoteMethod('getTotalLike', {
    description: 'Method to get follow',
    accepts: [
      {
        arg: 'videoId',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/getTotalLike/:videoId',
      verb: 'get'
    }
  });
};
