'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ErrorMemo = function ErrorMemo() {
  var errors = {};
  var check = function check(field) {
    return function (cond) {
      return function (message) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (!cond) {
          if (typeof message === 'function') {
            message = message.apply(undefined, [field].concat(args));
          }
          errors[field] = [].concat(_toConsumableArray(errors[field] || []), [message]);
        }
        return errors;
      };
    };
  };
  Object.assign(check, { errors: errors });
  return check;
};

var Validate = function Validate(cfg) {
  return function (data) {
    var memo = Object.keys(cfg).reduce(function (check, field) {
      var validators = cfg[field];
      if (typeof validators === 'function') {
        validators = [validators];
      }
      if (Array.isArray(validators)) {
        validators.forEach(function (validator) {
          validator(data, field, check(field));
        });
      }
      return check;
    }, ErrorMemo());

    return memo.errors;
  };
};

exports.default = Validate;