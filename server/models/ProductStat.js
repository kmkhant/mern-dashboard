import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema(
	{
		productId: String,
		yearlySalesTotal: Number,
		yearlyTotal: Number,
		year: Number,
		monthlyData: [
			{
				month: String,
				totalSales: String,
				totalUnits: String,
			},
		],
		dailyData: {
			date: String,
			totalSales: String,
			totalUnits: String,
		},
	},
	{
		timestamps: true,
	}
);

const ProductStat = mongoose.model(
	"ProductStat",
	ProductStatSchema
);
export default ProductStat;
