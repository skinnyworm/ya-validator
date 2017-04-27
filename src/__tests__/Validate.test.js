import Validate from '../index';
import MustBeEmail from '../mustBeEmail';
import MustPresent from '../mustPresent';
import MustMatchField from '../mustMatchField';

describe('Validate', ()=>{
  let required, email;

  beforeEach(()=>{
    required = MustPresent();
    email = MustBeEmail();
  })

  test('validate a field successful',()=>{
    const data = {email:'user@example.com'}
    const errors = Validate({email: email})(data);

    expect(errors.email).not.toBeDefined();
  })

  test('validate a field with single validator',()=>{
    const data = {email:''}
    const errors = Validate({email: email})(data);

    expect(errors.email.length).toEqual(1);
    expect(errors.email).toEqual(['not email']);
  })

  test('validate a field with multiple validators', ()=>{
    const data = {email:''}
    const errors = Validate({email: [required(), email]})(data);

    expect(errors.email.length).toEqual(2);
    expect(errors.email).toEqual(['required', 'not email']);
  })

  test('validator can be chained', ()=>{
    const validate = Validate({email: required(email)});

    expect(validate({email:''}).email).toEqual(['required']);
    expect(validate({email:'test'}).email).toEqual(['not email']);
  })

  describe('customize error message', ()=>{
    test('error message is a string', ()=>{
      required = MustPresent({error: 'Field must present'})
      const errors = Validate({email: required()})({});

      expect(errors.email).toEqual(['Field must present']);
    });

    test('when error message is function, it is called with field name', ()=>{
      const required = MustPresent({error: (field)=>`${field} must be presented`});
      const errors = Validate({email: required()})({});

      expect(errors.email).toEqual(['email must be presented']);
    });

    test('when error message is function, it can be called with extra argument from validator', ()=>{
      const match = MustMatchField({field: 'password', error: (field, target)=>`${field} must match ${target}`});
      const errors = Validate({passwordMatch: match})({password:'password', passwordMatch: 'not_match'});

      expect(errors.passwordMatch).toEqual(['passwordMatch must match password']);
    });
  });
})
