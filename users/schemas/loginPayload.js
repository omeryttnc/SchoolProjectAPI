module.exports = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    role:{
      type: 'string'
    }
  },
  required: [
    'username',
    'password',
    'role'
  ],
  additionalProperties: false
};
