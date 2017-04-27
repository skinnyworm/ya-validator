ya-validator === Yet Another Validator
===========

### What is the difference?

Not really much. Common validation flow involves config a validator and then validate data. By add some functional flavour, __ya-validator__ make config and customization easier.

## Create validate function

### Basic Usage

```javascript
import Validate from 'ya-validator';
import MustBeEmail from 'ya-validator/lib/mustBeEmail';

// Created a validate function to validate data's email field.
const validate = Validate({email: MustBeEmail()});
const data = {email:''}

// Once validated data, errors contains error messages of a invalid field
const errors = validate(data);

// errors should be
// {email: ['not email']}
```

### Validate field with multiple validators

A field can be validated by multiple validator functions in sequence.

```javascript
import Validate from 'ya-validator';
import MustBeEmail from 'ya-validator/lib/mustBeEmail';
import MustPresent from 'ya-validator/lib/mustPresent';

const required = MustPresent();
const email = MustBeEmail();

const errors = Validate({email: [required(), email]})({email:''});

// errors should be
// {email: ['required', 'not email']}
```

### Validator can be chained

In many cases we don't need run through all the validator functions if one is failed. For example, if a email field is required and must be in correct email format. We don't need to validate the email format if the field is blank. Fortunately, the validator is just a function and it can be chained up.

The build in MustBePresent validator is doing so. It will ignore chained validator if data field is blank.

```javascript
import Validate from 'ya-validator';
import MustBeEmail from 'ya-validator/lib/mustBeEmail';
import MustPresent from 'ya-validator/lib/mustPresent';

const required = MustPresent();
const email = MustBeEmail();
const validate = Validate({email: required(email)})

let errors = validate({email:''});
// errors should be
// {email: ['required']}

errors = validate({email:'invalid'});
// errors should be
// {email: ['not email']}
```

### Customize error message

A validator is just a simple function. The build in validator builder can be customized to fit more generic usecases.

For example

```javascript
import Validate from 'ya-validator';
import MustPresent from 'ya-validator/lib/mustPresent';
import MustBeEmail from 'ya-validator/lib/mustBeEmail';
import MustMatchField from 'ya-validator/lib/mustMatchField';

const required = MustPresent({error: 'can not be blank'});
const email = MustBeEmail({error: (field)=>`${field} is not an email address`});
const match = MustMatchField({field: 'password', error: (field, other)=>`${field} must match ${other}`});

const validate = Validate({
  email: required(email),
  password: required(),
  passwordMatch: required(match)
})

const errors = validate({
  email: 'incorret email',
  password: '',
  passwordMatch: 'not match',
})

// errors should be
// {
//   email: ['email is not an email address'],
//   password: ['can not be blank'],
//   passwordMatch: ['passwordMatch must match password']
// }
```

## Create validator

Validator is just a function that check the data field. For example the internal MustBeEmail validator builder is very simple.

```javascript
import isEmail from 'validator/lib/isEmail';

export default (opts={error: 'not email'})=> (data, field, check)=>{
  check(isEmail(data[field]))(opts.error)
}
```

It created an email validator that will check if the email is valid. The third argument `check` is a memo function that will resolve error message to the final result if check is failed.
