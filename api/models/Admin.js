const { Schema, model } = require('mongoose')

const AdminSchema = new Schema({
	email: {
		type: Schema.Types.String,
		required: true,
		trim: true,
		maxlength: 50,
	},
	password: {
		type: Schema.Types.String,
		required: true,
	},
}, { timestamps: true })

const Admin = model('Admin', AdminSchema, 'admins')

module.exports = Admin
