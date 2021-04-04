const { Schema, model } = require('mongoose')

const CustomerSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true,
		trim: true,
		maxlength: 100,
	},
	phone: {
		type: Schema.Types.String,
		trim: true,
		required: true,
		maxlength: 15,
	},
	comment: {
		type: Schema.Types.String,
		trim: true,
		required: true,
		maxlength: 500,
	},
	order: {
		title: {
			type: Schema.Types.String,
			required: true,
			trim: true,
		},
		count: {
			type: Schema.Types.String,
			required: true,
			trim: true,
		},
		color: {
			type: Schema.Types.String,
			required: true,
			trim: true,
		},
		totalPrice: {
			type: Schema.Types.String,
			required: true,
			trim: true,
		},
	},
}, { timestamps: true })

const Customer = model('Customer', CustomerSchema, 'customers')

module.exports = Customer
