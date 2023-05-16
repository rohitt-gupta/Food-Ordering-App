import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
	const [Meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();
	useEffect(() => {
		fetchMeals().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	const fetchMeals = async () => {
		const response = await fetch(
			"https://omnifood-97c02-default-rtdb.firebaseio.com/meals.json"
		);
		if (!response.ok) {
			throw new Error("something went wrong!");
		}
		const responseData = await response.json();
		// console.log(responseData);

		const loadedMeals = [];
		for (const key in responseData) {
			loadedMeals.push({
				id: key,
				name: responseData[key].name,
				description: responseData[key].description,
				price: responseData[key].price,
			});
		}
		setMeals(loadedMeals);
		setIsLoading(false);
	};
	if (isLoading) {
		return (
			<section className={classes.MealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={classes.MealsError}>
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList = Meals.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
