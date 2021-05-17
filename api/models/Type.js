const { Schema, model } = require('mongoose')

const TypeSchema = new Schema({
	tiles: [{
		type: Schema.Types.ObjectId,
		ref: 'Tile',
	}],
	title: {
		type: Schema.Types.String,
		trim: true,
		maxLength: 50,
		required: true,
		unique: true,
	},
	url: {
		type: Schema.Types.String,
		required: true,
		trim: true,
		unique: true,
	},
}, { timestamps: true })

const Type = model('Type', TypeSchema, 'types')

module.exports = Type
