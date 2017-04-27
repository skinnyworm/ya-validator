'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmail = require('validator/lib/isEmail');

var _isEmail2 = _interopRequireDefault(_isEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { error: 'not email' };
  return function (data, field, check) {
    check((0, _isEmail2.default)(data[field]))(opts.error);
  };
};