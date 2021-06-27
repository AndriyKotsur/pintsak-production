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
	message: {
		type: Schema.Types.String,
		trim: true,
		maxlength: 500,
	},
	order: [{
		title: {
			type: Schema.Types.String,
			trim: true,
		},
		quantity: {
			type: Schema.Types.String,
			trim: true,
		},
		variant: {
			type: Schema.Types.String,
			trim: true,
		},
		price: {
			type: Schema.Types.String,
			trim: true,
		},
	}],
}, { timestamps: true })

const Customer = model('Customer', CustomerSchema, 'customers')

module.exports = Customer
