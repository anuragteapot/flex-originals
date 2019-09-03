'use strict';

module.exports = function(Follow) {
  Follow.getFollowers = async followId => {
    return await Follow.find({
      include: ['channel'],
      where: {
        visibility: 1,
        followOwnerId: followId
      }
    });
  };

  Follow.remoteMethod('getFollowers', {
    description: 'Method to get followers',
    accepts: [
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
      path: '/getFollowers/:followId',
      verb: 'get'
    }
  });

  Follow.getFollow = async (channelId, followId) => {
    const f = await Follow.findOne({
      where: {
        channel: channelId,
        visibility: 1,
        followOwnerId: followId
      }
    });

    if (f) {
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
      const historyCheck = await Follow.findOne({
        where: {
          channel: channelId,
          followOwnerId: followId
        }
      });

      if (historyCheck) {
        historyCheck.visibility = 1;
        historyCheck.save();

        return { SUCCESS: true };
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

  Follow.unFollow = async (channelId, followId) => {
    const historyCheck = await Follow.findOne({
      where: {
        channel: channelId,
        followOwnerId: followId
      }
    });

    if (historyCheck) {
      historyCheck.visibility = 0;
      historyCheck.save();
    }

    return { SUCCESS: false };
  };

  Follow.remoteMethod('unFollow', {
    description: 'Method to un follow',
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
      path: '/unFollow',
      verb: 'post'
    }
  });
};
