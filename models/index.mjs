import { Model, QueryBuilder } from 'objection';
import visibilityPlugin from 'objection-visibility';
import softDelete from 'objection-soft-delete';
import moment from 'moment';

const visibility = visibilityPlugin.default;

const soft = softDelete({
    columnName: 'deleted_at',
    deletedValue: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
    notDeletedValue: null
});

// Extend the QueryBuilder prototype with the mergeContext function
QueryBuilder.prototype.mergeContext = QueryBuilder.prototype.context;

export default class BaseModel extends visibility(soft(Model)) {
    $beforeInsert() {
        this.created_at = moment().format('YYYY-MM-DDTHH:mm:ssZ');
    }

    $beforeUpdate() {
        this.updated_at = moment().format('YYYY-MM-DDTHH:mm:ssZ');
    }
}
