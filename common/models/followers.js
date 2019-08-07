'use strict';

module.exports = function(Followers) {
  Followers.followChannel = async (id, channelId) => {
    return Followers.create({ followUserId: id, channelId, active: true });
  };

  Followers.remoteMethod('followChannel', {
    description: 'Method to follow channel.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true
      },
      {
        arg: 'channelId',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/followChannel',
      verb: 'post'
    }
  });
};
