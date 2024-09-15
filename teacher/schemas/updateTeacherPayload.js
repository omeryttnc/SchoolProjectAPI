export const updateTeacherPayload = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    email: {
      type: 'string'
    }
    ,
    password: {
      type: 'string'
    }
    ,
    role: {
      type: 'string'
    }
    ,
    firstName: {
      type: 'string'
    }
    ,
    lastName: {
      type: 'string'
    },
    approved:{
      type: 'boolean'
    }
  },
  additionalProperties: false
};
