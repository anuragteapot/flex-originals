'use strict'

module.exports = function(Settings) {
  Settings.findSetting = async id => {
    if (!id) {
      throw new Error('User Id is required.', {}, 500)
    }
    return await Settings.find({ where: { id } })
  }

  Settings.remoteMethod('findSetting', {
    description: 'Method to get the user settings',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/findSetting/:id',
      verb: 'get'
    }
  })

  Settings.updateSetting = async id => {
    if (!id) {
      throw new Error('User Id is required.', {}, 500)
    }
    return await Settings.find({ where: { userId: id } })
  }

  Settings.remoteMethod('updateSetting', {
    description: 'Method to get the user settings',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/findSetting/:id',
      verb: 'get'
    }
  })
}
