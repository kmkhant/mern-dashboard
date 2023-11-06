import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			min: 2,
			max: 100,
		},
		email: {
			type: String,
			required: true,
			min: 2,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 2,
			max: 32,
		},
		city: String,
		state: String,
		country: String,
		occupation: String,
		phoneNumber: String,
		transactions: Array,
		role: {
			type: String,
			enum: ["user", "admin", "superadmin"],
			default: "admin",
		},
	},
	{ timestamps: true }
);

export const User = mongoose.model("user", UserSchema);

export default User;
