const ErrorMemo = ()=>{
  const errors = {}
  const check = (field)=> (cond)=> (message, ...args)=>{
    if(!cond){
      if(typeof(message) === 'function'){
        message = message(...[field, ...args]);
      }
      errors[field] = [...(errors[field] || []), message];
    }
    return errors;
  }
  Object.assign(check, {errors});
  return check;
}

const Validate = (cfg)=>{
  return (data)=>{
    const memo = Object.keys(cfg).reduce((check, field)=>{
      let validators = cfg[field];
      if (typeof(validators) === 'function'){
        validators = [validators]
      }
      if(Array.isArray(validators)){
        validators.forEach((validator)=>{validator(data, field, check(field))});
      }
      return check;
    }, ErrorMemo());

    return memo.errors;
  }
}

export default Validate;
