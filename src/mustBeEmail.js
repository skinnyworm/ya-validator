import isEmail from 'validator/lib/isEmail';

export default (opts={error: 'not email'})=> (data, field, check)=>{
  check(isEmail(data[field]))(opts.error)
}
