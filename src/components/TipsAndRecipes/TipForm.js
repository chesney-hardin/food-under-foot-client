import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPlantParts } from "../../managers/PlantPartsManager"
import { getSinglePlant } from "../../managers/WildPlantsManager"
import { postNewTipOrRecipe } from "../../managers/TipsAndRecipesManager"

export const TipForm = () => {
  const { plantId } = useParams()
  const [plantParts, setPlantParts] = useState([])
  const [plant, setPlant] = useState({})
  const [newTip, setNewTip] = useState({
    // set user and date on server side
    wild_plant: plantId,
    plant_part: 0,
    title: "",
    description: "",
    image: "",
    isRecipe: false,
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
    event.preventDefault()

    postNewTipOrRecipe(newTip).then(() => {
      if(plantId) {
        navigate(`/edible-profile/${plantId}`)
        } else{
          navigate(`/user-tips-recipes`)
        }
    })
  }

  const handleChange = (event) => {
    const copy = { ...newTip }
    copy[event.target.name] = event.target.value
    setNewTip(copy)
  }

  return (
    <section className="bg-gray-100 p-4">
      <ol className="border-fuf-green bg-fuf-teal bg-opacity-40 border rounded-lg p-8 list-decimal mx-10 min-w-min shadow">
        <li>Add a harvest or post-harvest tip.</li>
        <li>Once submitted, your tip will be reviewed by an admin.</li>
        <li>Once reviewed and approved, your tip be made public and appear on the plant profile.</li>
      </ol>
      <section className="bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Add a tip for {plant.common_name}:</h1>
        <form>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                value={newTip.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="plant_part">Plant Part:</label>
              <select
                value={newTip.plant_part}
                required
                name="plant_part"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
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
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              required
              className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              name="description"
              value={newTip.description}
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
                placeholder="Link to an image associated with tip..."
                name="image"
                value={newTip.image}
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
