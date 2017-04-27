"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!opts.field) {
    throw "must specify a field to match";
  }
  opts = Object.assign({ error: 'not match' }, opts);
  return function (data, field, check) {
    check(!(data[field] !== data[opts.field]))(opts.error, opts.field);
  };
};