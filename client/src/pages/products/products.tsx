import React, { useState } from "react";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	Collapse,
	Button,
	Typography,
	Rating,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import Header from "@/components/Header";
import { useGetProductsQuery } from "@/features/api";
import Loader from "@/components/Loader";

export interface IProductProps {
	_id: string;
	name: string;
	description: string;
	price: number;
	rating: number;
	category: string;
	supply: string;
	stat: IProductStat;
}

interface IProductStat {
	productId: string;
	yearlySalesTotal: number;
	yearlyTotal: number;
	year: number;
	monthlyData: [
		{
			month: string;
			totalSales: string;
			totalUnits: string;
		}
	];
	dailyData: {
		date: string;
		totalSales: string;
		totalUnits: string;
	};
}

const Product: React.FC<IProductProps> = ({
	_id,
	name,
	description,
	price,
	rating,
	category,
	supply,
	stat,
}) => {
	const theme = useTheme();
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<Card
			sx={{
				backgroundImage: "none",
				backgroundColor: theme.palette.background.alt,
				borderRadius: "0.55rem",
			}}
		>
			<CardContent>
				<Typography
					sx={{ fontSize: 14 }}
					color={theme.palette.secondary.main}
					gutterBottom
				>
					{category}
				</Typography>
				<Typography variant="h5" component="div">
					{name}
				</Typography>
				<Typography
					sx={{ mb: "1.5rem" }}
					color={theme.palette.secondary.main}
				>
					${Number(price).toFixed(2)}
				</Typography>
				<Rating value={rating} readOnly />
				<Typography variant="body2">
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					variant="contained"
					size="small"
					onClick={() => setIsExpanded((prev) => !prev)}
				>
					See More
				</Button>
			</CardActions>
			<Collapse
				in={isExpanded}
				timeout="auto"
				unmountOnExit
			>
				<CardContent>
					<Typography>id: {_id}</Typography>
					<Typography>Supply Left: {supply}</Typography>
					<Typography>
						Yearly Sales This Year: {stat.yearlySalesTotal}
					</Typography>
					<Typography>
						Yearly Units Sold This Year: {stat.yearlyTotal}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

const Products = () => {
	const { data, isLoading } = useGetProductsQuery();
	const isNonMobile = useMediaQuery("(min-width: 1000px)");

	return (
		<Box>
			<Header
				title="Products"
				subtitle="List of products"
			/>
			{!isLoading ? (
				<Box
					display="grid"
					gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
					justifyContent={"space-between"}
					rowGap="20px"
					columnGap="1.33%"
					sx={{
						m: "2rem",
						"& > div": {
							gridColumn: isNonMobile
								? undefined
								: "span 4",
						},
					}}
				>
					{data &&
						data.map(
							({
								_id,
								name,
								description,
								price,
								rating,
								category,
								supply,
								stat,
							}) => (
								<Product
									key={_id}
									_id={_id}
									name={name}
									description={description}
									price={price}
									rating={rating}
									category={category}
									supply={supply}
									stat={stat}
								/>
							)
						)}
				</Box>
			) : (
				<Loader />
			)}
		</Box>
	);
};

export default Products;
