'use strict'

module.exports = function(Settings) {
  Settings.findSetting = async function(userId) {
    if (!userId) {
      throw new Error('User Id is required.', {}, 500)
    }
    return await Settings.find({ where: { userId: userId } })
  }

  Settings.remoteMethod('findSetting', {
    description: 'Method to get the user settings',
    accepts: [
      {
        arg: 'userId',
        type: 'number',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/findSetting',
      verb: 'post'
    }
  })
}
