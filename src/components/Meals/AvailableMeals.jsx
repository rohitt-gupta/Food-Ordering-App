import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
	const [Meals, setMeals] = useState([]);
	useEffect(() => {
		fetchMeals();
	}, []);

	const fetchMeals = async () => {
		const response = await fetch(
			"https://omnifood-8fb3e-default-rtdb.firebaseio.com/meals.json"
		);
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
	};

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
