export default (opts={error: 'required'})=> (next)=> (data, field, check)=>{
  const value = data[field];
  const valid = !!value && value.length > 0
  check(valid)(opts.error)
  if(valid && next){
    next(data,field,check)
  }
}
