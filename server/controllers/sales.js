import OverallStat from "../models/OverallStat.js";

export const getOverallStat = async (req, res) => {
	try {
		const overallStat = await OverallStat.find();

		res.status(200).json(...overallStat);
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: e.message });
	}
};
