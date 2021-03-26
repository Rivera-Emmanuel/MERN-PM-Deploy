const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			minlength: [3, "Title must be at least 3 characters long"]
		},

		price: {
			type: Number,
			required: [true, "Price is required."],
			minlength: [1, "Number is required of at least one digit."]
		},
		
		description: {
			type: String,
			required: [true, "Description is required"],
			minlength: [6, "Description must be at least 6 characters long"],
			maxlength: [40, "Max lenght is 40 characters"]
		},
	},

		{timestamps: true}
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;