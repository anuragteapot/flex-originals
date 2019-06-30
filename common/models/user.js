var config = require('../../server/config.json')

//Replace this address with your actual address
var senderAddress = 'noreply@loopback.com'

module.exports = function(User) {
  //send verification email after registration
  User.afterRemote('create', function(context, user, next) {
    var options = {
      type: 'email',
      to: user.email,
      from: senderAddress,
      subject: 'Thanks for registering.',
      redirect: '/verified',
      user: user
    }

    user.verify(options, function(err) {
      if (err) {
        User.deleteById(user.id)
        return next(err)
      }
      context.result = {
        title: 'Signed up successfully',
        content:
          'Please check your email and click on the verification link ' +
          'before logging in.',
        redirectTo: '/'
      }
      return next()
    })
  })

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
    }
    return next()
  })

  User.afterRemote('prototype.confirm', function(ctx, next) {
    console.log('Cannot speak! after', ctx);
    next();
  });

  User.beforeRemote('prototype.confirm', function(ctx, next) {
    console.log('Cannot speak before!', ctx);
    next();
  });


  //send password reset link when requested
  User.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password'
    var html =
      'Click <a href="' +
      url +
      '?access_token=' +
      info.accessToken.id +
      '">here</a> to reset your password'

    User.app.models.Email.send(
      {
        to: info.email,
        from: senderAddress,
        subject: 'Password reset',
        html: html
      },
      function(err) {
        if (err) return console.log('> error sending password reset email')
        console.log('> sending password reset email to:', info.email)
      }
    )
  })

  //render UI page after password change
  User.afterRemote('changePassword', function(context, user, next) {
    context.result = {
      title: 'Password changed successfully',
      content: 'Please login again withu new password',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    }
    return next()
  })

  //render UI page after password reset
  User.afterRemote('setPassword', function(context, user, next) {
    context.result = {
      title: 'Password reset success',
      content: 'Your password has been reset successfully',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    }
    return next()
  })
}
