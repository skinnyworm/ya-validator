export default (opts={})=> {
  if(!opts.field){
    throw "must specify a field to match";
  }
  opts = Object.assign({error: 'not match'}, opts);
  return (data, field, check)=>{
    check(!(data[field] !== data[opts.field]))(opts.error, opts.field);
  }
}
