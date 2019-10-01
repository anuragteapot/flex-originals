const config = require('../../server/config.json');
const path = require('path');
const app = require('../../server/server');

//Replace this address with your actual address
const senderAddress = 'noreply@flexoriginales.com';

module.exports = function(User) {
  User.afterRemote('create', function(context, user, next) {
    const Settings = app.models.Settings;

    var options = {
      type: 'email',
      to: user.email,
      from: senderAddress,
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/mails/verify.ejs'),
      host:
        process.env.NODE_ENV === 'production'
          ? 'flexoriginals.ml'
          : 'localhost',
      port: process.env.NODE_ENV === 'production' ? '80' : '3344',
      redirect: '/',
      restApiRoot: '/verify',
      user: user
    };

    const profileAvatar = `/public/profile-icon/avatar${Math.floor(
      Math.random() * 28
    ) + 1}.svg`;

    Settings.upsert({
      ownerId: user.id,
      desktopNotification: false,
      emailNotification: false,
      verifiedChannel: false,
      followers: 0,
      facebook: '',
      instagram: '',
      twitter: '',
      redit: '',
      linkedin: '',
      profileAvatar
    });

    user.verify(options, function(err) {
      if (err) {
        User.deleteById(user.id);
        return next(err);
      }
      context.result = {
        title: 'Signed up successfully',
        content:
          'Please check your email and click on the verification link ' +
          'before logging in.',
        redirectTo: '/'
      };
      return next();
    });
  });

  // Method to render
  User.afterRemote('prototype.verify', function(context, user, next) {
    context.result = {
      title:
        'A Link to reverify your identity has been sent ' +
        'to your email successfully',
      content:
        'Please check your email and click on the verification link ' +
        'before logging in',
      redirectTo: '/'
    };
    return next();
  });

  User.afterRemote('prototype.confirm', function(ctx, next) {
    console.log('Cannot speak! after', ctx);
    next();
  });

  User.beforeRemote('prototype.confirm', function(ctx, next) {
    console.log('Cannot speak before!', ctx);
    next();
  });

  //send password reset link when requested
  User.on('resetPasswordRequest', function(ctx) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html =
      'Click <a href="' +
      url +
      '?access_token=' +
      ctx.accessToken.id +
      '">here</a> to reset your password';

    User.app.models.Email.send(
      {
        to: ctx.email,
        from: senderAddress,
        subject: 'Password reset',
        html: html
      },
      function(err) {
        if (err) return console.log('> error sending password reset email');
        console.log('> sending password reset email to:', ctx.email);
      }
    );
  });

  User.findSetting = async id => {
    const Settings = app.models.Settings;
    if (!id) {
      throw new Error('User Id is required.', {}, 500);
    }
    return await Settings.findOne({ where: { ownerId: id } });
  };

  User.remoteMethod('findSetting', {
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
  });

  User.updateSetting = async (id, newSettings) => {
    const Settings = app.models.Settings;
    if (!id) {
      throw new Error('User Id is required.', {}, 500);
    }
    let userSettings = await Settings.findOne({ where: { ownerId: id } });
    userSettings.desktopNotification = newSettings.desktopNotification;
    userSettings.emailNotification = newSettings.emailNotification;
    userSettings.verifiedChannel = newSettings.verifiedChannel;
    userSettings.followers = newSettings.followers;
    userSettings.theme = newSettings.theme;
    userSettings.facebook = newSettings.facebook;
    userSettings.instagram = newSettings.instagram;
    userSettings.twitter = newSettings.twitter;
    userSettings.redit = newSettings.redit;
    userSettings.linkedin = newSettings.linkedin;
    return userSettings.save();
  };

  User.remoteMethod('updateSetting', {
    description: 'Method to get the user settings',
    accepts: [
      {
        arg: 'id',
        type: 'string',
        required: true
      },
      {
        arg: 'newSettings',
        type: 'object',
        required: true
      }
    ],
    returns: {
      type: 'object',
      root: true
    },
    http: {
      path: '/updateSettings',
      verb: 'post'
    }
  });

  //render UI page after password change
  User.afterRemote('changePassword', function(context, user, next) {
    context.result = {
      title: 'Password changed successfully',
      content: 'Please login again withu new password',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    };
    return next();
  });

  //render UI page after password reset
  User.afterRemote('setPassword', function(context, user, next) {
    context.result = {
      title: 'Password reset success',
      content: 'Your password has been reset successfully',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    };
    return next();
  });

  User.followChannel = async (id, channelId) => {
    const Followers = app.models.followers;
    return Followers.create({
      followUserId: id,
      channelId,
      userId: id,
      active: true
    });
  };

  User.remoteMethod('followChannel', {
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

  User.unFollowChannel = async (id, channelId) => {
    const Followers = app.models.followers;
    return Followers.findOne({
      where: {
        userId: id
      }
    });
  };

  User.remoteMethod('unFollowChannel', {
    description: 'Method to un follow channel.',
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
      path: '/unFollowChannel',
      verb: 'post'
    }
  });
};
