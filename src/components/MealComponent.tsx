import { useState, useEffect } from 'react';
import ModalView from './ModalView';

const MealComponent = () => {
  type MealItem = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  };
  const [meal, setMeal] = useState<MealItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMeal(data.meals);
        setLoading(false);
        console.log(data.meals);
        
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='recipesBoxes'>
      {meal && meal.map((item: any) => (
        <div key={item.idMeal} className='recipeBox'>
          <h2>{item.strMeal}</h2>
          <img src={item.strMealThumb} alt={item.strMeal} />
          <ModalView idMeal={item.idMeal}/>
        </div>
      ))}
    </div>
  );
};

export default MealComponent;
