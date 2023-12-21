import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
	{
		totalCustomers: Number,
		yearlySalesTotal: Number,
		yearlyTotalSoldUnits: Number,
		year: Number,
		monthlyData: [
			{
				month: String,
				totalSales: Number,
				totalUnits: Number,
			},
		],
		dailyData: [
			{
				data: String,
				totalSales: Number,
				totalUnits: Number,
			},
		],
		salesByCategory: {
			type: Map,
			of: Number,
		},
	},
	{ timestamps: false }
);

const OverallStat = mongoose.model(
	"OverallStat",
	OverallStatSchema
);
export default OverallStat;
