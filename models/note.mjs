import BaseModel from './index.mjs';

export default class Note extends BaseModel {
    
}

Note.tableName = 'notes';
Note.jsonSchema = {
    type: 'object',
    required: ['title', 'body'],
    properties: {
        id: { type: 'integer' },
        title: { type: 'string', maxLength: 255},
        body: {type: 'string', maxLength: 65535},
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: ['string', 'null'], format: 'date-time' },
        deleted_at: { type: ['string', 'null'], format: 'date-time' },
    },
};
