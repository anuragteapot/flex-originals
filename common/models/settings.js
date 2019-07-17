'use strict'

module.exports = function(Settings) {
  Settings.findSetting = async ownerId => {
    if (!ownerId) {
      throw new Error('User Id is required.', {}, 500)
    }
    return await Settings.find({ where: { userId: ownerId } })
  }

  Settings.remoteMethod('findSetting', {
    description: 'Method to get the user settings',
    accepts: [
      {
        arg: 'ownerId',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/findSetting/:ownerId',
      verb: 'get'
    }
  })
}
