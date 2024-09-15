import { roles } from '../../config.js' ;

const changeRole =  {
  type: 'object',
  properties: {
    role: {
      type: 'string',
      enum: Object.values(roles)
    }
  },
  additionalProperties: false
};

export default changeRole
