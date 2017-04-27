'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { error: 'required' };
  return function (next) {
    return function (data, field, check) {
      var value = data[field];
      var valid = !!value && value.length > 0;
      check(valid)(opts.error);
      if (valid && next) {
        next(data, field, check);
      }
    };
  };
};