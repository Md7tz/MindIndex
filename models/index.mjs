import { Model } from 'objection';
import visibilityPlugin from 'objection-visibility';
import softDelete from 'objection-soft-delete';
import moment from 'moment';

const visibility = visibilityPlugin.default;

export default class BaseModel extends visibility(softDelete(Model)) {
    static get softDelete() {
        return true;
    }

    $beforeInsert() {
        this.created_at = moment().format('YYYY-MM-DDTHH:mm:ssZ');
    }

    $beforeUpdate() {
        this.updated_at = moment().format('YYYY-MM-DDTHH:mm:ssZ');
    }
}

BaseModel.tableName = 'base_model';
BaseModel.jsonSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: ['string', 'null'], format: 'date-time' },
        deleted_at: { type: ['string', 'null'], format: 'date-time' },
    },
};
