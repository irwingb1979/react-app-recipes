import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Define the props type
interface ModalViewProps {
  idMeal: string; // Specify the type for idMeal
}

function ModalView({ idMeal }: ModalViewProps) {
  //Modal Component
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //API
  type MealItem = {
    strInstructions: string;
    strMeal: string;
    strCategory: string;
    strIngredient1: string;
  };
  const [meal, setMeal] = useState<MealItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
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
    <>
      <Button variant="primary" onClick={handleShow}>
        View More
      </Button>
      {meal && meal.map((item:any) => (
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{item.strMeal}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='detailWindow'>
              <p className='category'>Category: {item.strCategory}</p>
              <h4>Instructions</h4>
              <p className='instructions'>{item.strInstructions}</p>
              <h4>Ingredients</h4>
              <ul>
                <li>{item.strIngredient1}</li>
                <li>{item.strIngredient2}</li>
                <li>{item.strIngredient3}</li>
                <li>{item.strIngredient4}</li>
                <li>{item.strIngredient5}</li>
                <li>{item.strIngredient6}</li>
                <li>{item.strIngredient7}</li>
              </ul>
            </div>
          </Modal.Body>
        </Modal>
      ))}
    </>
  );
}

export default ModalView;