'use strict';

module.exports = function(Comment) {
  Comment.getComment = async (id, limit, type) => {
    if (id) {
      if (type == 'video') {
        return await Comment.find({
          where: { videoCommentId: id },
          limit: limit
        });
      } else if (type == 'audio') {
        return await Comment.find({
          where: { audioCommentId: id },
          limit: limit
        });
      }
    }
  };

  Comment.remoteMethod('getComment', {
    description: 'Method to get comments.',
    accepts: [
      {
        arg: 'id',
        type: 'string'
      },
      {
        arg: 'limit',
        type: 'string',
        required: true
      },
      {
        arg: 'type',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/getComment/:type/:limit/:id',
      verb: 'get'
    }
  });
};
