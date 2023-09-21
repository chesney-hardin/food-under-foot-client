import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlantParts } from "../../managers/PlantPartsManager";
import { getTipsOrRecipesById, updateTipOrRecipe } from "../../managers/TipsAndRecipesManager";

export const RecipeEditForm = () => {
    const { recipeId } = useParams()
    const [plantParts, setPlantParts] = useState([])
    const [plant, setPlant] = useState({})
    const [fetchedRecipe, setFetchedRecipe] = useState({})
    const [recipe, setRecipe] = useState({
        plant_part: 0,
        title: "",
        description: "",
        image: ""
    });

    const navigate = useNavigate()

    useEffect(() => {
        getPlantParts().then((parts) => setPlantParts(parts));
    }, [])

    useEffect(() => {
        if (recipeId) {
            getTipsOrRecipesById(recipeId).then((recipe) => setFetchedRecipe(recipe))
        }
    }, [recipeId])

    useEffect(() => {
        if (fetchedRecipe.id) {
            setRecipe({
                id: fetchedRecipe.id,
                user: fetchedRecipe.user.id,
                wild_plant: fetchedRecipe.wild_plant.id,
                plant_part: fetchedRecipe.plant_part.id,
                date: fetchedRecipe.date,
                title: fetchedRecipe.title,
                description: fetchedRecipe.description,
                image: fetchedRecipe.image,
                isRecipe: fetchedRecipe.isRecipe,
                isApproved: false,
                needsReview: true,
                reasonUnapproved: fetchedRecipe.reasonUnapproved
            })
        }
    }, [fetchedRecipe])


    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        updateTipOrRecipe(recipeId, recipe).then(() => {
            navigate(`/user-tips-recipes`);
        })
    }

    const handleChange = (event) => {
        const copy = { ...recipe };
        copy[event.target.name] = event.target.value;
        setRecipe(copy)
    };

    return (
        <section className="bg-gray-100 p-4">
            <ol className="border rounded-lg p-4">
                <li>Edit your recipe.</li>
                <li>Once submitted, your recipe will need to be reviewed by an admin again.</li>
                <li>Once reviewed and approved, your recipe be made public and appear on the plant profile.</li>
            </ol>
            <section className="bg-white p-4 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold mb-4">Add a recipe for {plant.common_name}:</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title:
                        </label>
                        <input
                            required
                            autoFocus
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                            placeholder="Memorable title..."
                            name="title"
                            value={recipe.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="plant_part">Plant Part:</label>
                        <select
                            value={recipe.plant_part}
                            required
                            name="plant_part"
                            onChange={handleChange}
                            className="form-select"
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
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description:
                        </label>
                        <textarea
                            required
                            className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                            name="description"
                            value={recipe.description}
                            onChange={handleChange}
                            rows="5"
                        >
                            Harvesting techniques, companion plants, sustainable practices, post-harvest care, etc....
                        </textarea>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Image:
                            </label>
                            <input
                                required
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                                placeholder="Link to an image associated with recipe..."
                                name="image"
                                value={recipe.image}
                                onChange={handleChange}
                            />
                        </div>
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
    )
}