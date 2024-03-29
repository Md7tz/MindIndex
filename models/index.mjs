import { Model, QueryBuilder, raw } from 'objection';
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

	static get modifiers() {
		return {
			selectId(builder) {
				builder.select('id');
			},
			currentMonth(query) {
				const start = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
				const end = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
				query.whereBetween('created_at', [start, end]);
			},
		};
	}
}
