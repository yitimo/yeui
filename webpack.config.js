switch (process.env.NODE_ENV) {
  case 'test':
  case 'testing':
  default:
    module.exports = require('./config/webpack.test')({env: 'test'});
    break;
}
