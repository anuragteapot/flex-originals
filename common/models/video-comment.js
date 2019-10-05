'use strict';

module.exports = function(videoComment) {
  videoComment.getComments = async (id, limit) => {
    return await videoComment.find({
      include: ['user'],
      where: { replyId: id },
      limit: limit,
    });
  };

  videoComment.remoteMethod('getComments', {
    description: 'Method to get comments.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true,
      },
      {
        arg: 'limit',
        type: 'number',
        required: true,
      },
    ],
    returns: {
      type: 'object',
      root: true,
    },
    http: {
      path: '/getComments/:id/:limit',
      verb: 'get',
    },
  });

  videoComment.comment = async (userId, replyId, message) => {
    const c = await videoComment.create({
      videoCommentUserId: userId,
      replyId: replyId,
      message: message,
    });

    if (c) {
      return { SUCCESS: true };
    } else {
      return { SUCCESS: false };
    }
  };

  videoComment.remoteMethod('comment', {
    description: 'Method to add comment',
    accepts: [
      {
        arg: 'userId',
        type: 'string',
        required: true,
      },
      {
        arg: 'replyId',
        type: 'string',
        required: true,
      },
      {
        arg: 'message',
        type: 'string',
        required: true,
      },
    ],
    returns: {
      type: 'object',
      root: true,
    },
    http: {
      path: '/comment',
      verb: 'post',
    },
  });

  videoComment.editComment = async (id, userId, replyId, message) => {
    const comment = await videoComment.findOne({
      where: {
        id: id,
        videoCommentUserId: userId,
        replyId: replyId,
      },
    });

    if (!comment) {
      return { SUCCESS: false };
    }

    comment.message = message;

    return comment.save();
  };

  videoComment.remoteMethod('editComment', {
    description: 'Method to edit comment.',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true,
      },
      {
        arg: 'userId',
        type: 'string',
        required: true,
      },
      {
        arg: 'replyId',
        type: 'string',
        required: true,
      },
      {
        arg: 'message',
        type: 'string',
        required: true,
      },
    ],
    returns: {
      type: 'object',
      root: true,
    },
    http: {
      path: '/editComment',
      verb: 'put',
    },
  });
};
