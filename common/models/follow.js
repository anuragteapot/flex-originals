'use strict';

module.exports = function(Follow) {
  Follow.getFollow = async (channelId, followId) => {
    const f = await Follow.find({
      where: {
        channel: channelId,
        visibility: 1,
        followOwnerId: followId
      }
    });

    if (f.length == 1 && f[0].visibility == 1) {
      return { SUCCESS: true };
    } else {
      return { SUCCESS: false };
    }
  };

  Follow.remoteMethod('getFollow', {
    description: 'Method to get follow',
    accepts: [
      {
        arg: 'channelId',
        type: 'string',
        required: true
      },
      {
        arg: 'followId',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/getFollow/:channelId/:followId',
      verb: 'get'
    }
  });

  Follow.doFollow = async (channelId, followId) => {
    const isAlready = await Follow.getFollow(channelId, followId);

    if (isAlready.SUCCESS == true) {
      return isAlready;
    } else {
      const f = await Follow.create({
        channel: channelId,
        followOwnerId: followId
      });

      if (f) {
        return { SUCCESS: true };
      } else {
        return { SUCCESS: false };
      }
    }
  };

  Follow.remoteMethod('doFollow', {
    description: 'Method to do follow',
    accepts: [
      {
        arg: 'channelId',
        type: 'string',
        required: true
      },
      {
        arg: 'followId',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/doFollow',
      verb: 'post'
    }
  });

  Follow.unFollow = async () => {
    return await Follow.find({
      where: {
        channel: '12122413131',
        visibility: 1,
        followOwnerId: '121212144'
      },
      limit: 2
    });
  };

  Follow.remoteMethod('unFollow', {
    description: 'Method to un follow',
    accepts: [],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/unFollow',
      verb: 'post'
    }
  });
};
