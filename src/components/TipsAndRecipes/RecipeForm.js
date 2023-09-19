import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlantParts } from "../../managers/PlantPartsManager";
import { getSinglePlant } from "../../managers/WildPlantsManager";
import { postNewTipOrRecipe } from "../../managers/TipsAndRecipesManager";

export const RecipeForm = () => {
  const { plantId } = useParams()
  const [plantParts, setPlantParts] = useState([])
  const [plant, setPlant] = useState({})
  const [newRecipe, setNewRecipe] = useState({
    // set user and date on server side
    wild_plant: plantId,
    plant_part: 0,
    title: "",
    description: "",
    image: "",
    isRecipe: true,
    isApproved: false,
    needsReview: true,
    reasonUnapproved: ""
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (plantId) {
      getPlantParts().then((parts) => setPlantParts(parts))
      getSinglePlant(plantId).then((plant) => setPlant(plant))
    }
  }, [plantId])


  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    postNewTipOrRecipe(newRecipe).then(() => {
      navigate(`/user-tips-recipes`);
    });
  };

  const handleChange = (event) => {
    const copy = { ...newRecipe };
    copy[event.target.name] = event.target.value;
    setNewRecipe(copy)
  };

  return (
    <section className="bg-gray-100 p-4">
      <ol className="border rounded-lg p-4">
        <li>Add a new recipe.</li>
        <li>Once submitted, your recipe will be reviewed by an admin.</li>
        <li>Once reviewed and approved, your recipe be made public and appear on the plant profile.</li>
      </ol>
      <section className="bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Add a recipe for {plant.common_name}:</h1>
        <form>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title:
              </label>
              <input
                required
                autoFocus
                type="text"
                className="mt-1 block min-w-min rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="Memorable title..."
                name="title"
                value={newRecipe.title}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="plant_part" className="block text-sm font-medium text-gray-700">Plant Part:</label>
              <select
                value={newRecipe.plant_part}
                required
                name="plant_part"
                onChange={handleChange}
                className="mt-1 block min-w-min rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              >
                <option value="0">Select Edible Part</option>
                {plantParts.map((plantPart) => (
                  <option
                    key={`plantPart--${plantPart.id}`}
                    value={plantPart.id}
                  >
                    {plantPart.label}
                  </option>
                ))}
              </select>
            </div>
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image:
              </label>
              <input
                required
                type="text"
                className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="Link to an image associated with tip..."
                name="image"
                value={newRecipe.image}
                onChange={handleChange}
              />
            </div>

          <div className="mb-4 py-3">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              required
              className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              name="description"
              value={newRecipe.description}
              onChange={handleChange}
              rows="5"
            >
              Harvesting techniques, companion plants, sustainable practices, post-harvest care, etc....
            </textarea>
          </div>
          <div className="mt-4">
            <button
              onClick={handleSaveButtonClick}
              className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};
