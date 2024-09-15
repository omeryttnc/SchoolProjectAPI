import  {roles,config}  from '../../config.js';

const registerPayload = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    email: {
      type: 'string',
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
    },
    password: {
      type: 'string'
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    role: {
      type: 'string',
      enum: Object.values(roles)
    }
  },
  required: [
    'username',
    'email',
    'password',
    'firstName',
    'lastName',
    'role'
  ],
  additionalProperties: false
};

export default registerPayload;
