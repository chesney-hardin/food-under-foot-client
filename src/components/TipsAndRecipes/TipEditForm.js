import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPlantParts } from "../../managers/PlantPartsManager"
import { getTipsOrRecipesById, updateTipOrRecipe } from "../../managers/TipsAndRecipesManager"

export const TipEditForm = () => {
  const { tipId } = useParams()
  const [plantParts, setPlantParts] = useState([])
  const [fetchedTip, setFetchedTip] = useState({})
  const [tip, setTip] = useState({
    wild_plant: 0,
    plant_part: 0,
    title: "",
    description: "",
    image: ""
  })

  const navigate = useNavigate()

  useEffect(() => {
    getPlantParts().then((parts) => setPlantParts(parts))
  }, [])

  useEffect(() => {
    if (tipId) {
      getTipsOrRecipesById(tipId).then((tip) => setFetchedTip(tip))
    }
  }, [tipId])

  useEffect(() => {
    if (fetchedTip.id) {
      setTip({
        id: fetchedTip.id,
        user: fetchedTip.user.id,
        wild_plant: fetchedTip.wild_plant.id,
        plant_part: fetchedTip.plant_part.id,
        date: fetchedTip.date,
        title: fetchedTip.title,
        description: fetchedTip.description,
        image: fetchedTip.image,
        isRecipe: fetchedTip.isRecipe,
        isApproved: false,
        needsReview: true,
        reasonUnapproved: fetchedTip.reasonUnapproved
      })
    }
  }, [fetchedTip])


  const handleSaveButtonClick = (event) => {
    event.preventDefault()

    updateTipOrRecipe(tipId, tip).then(() => {
      navigate(`/user-tips-recipes`)
    })
  }

  const handleChange = (event) => {
    const copy = { ...tip }
    copy[event.target.name] = event.target.value
    setTip(copy)
  }

  return (
    <section className="bg-gray-100 p-4">
      <ol className="border-fuf-green bg-fuf-teal bg-opacity-40 border rounded-lg p-8 shadow list-disc mx-24 my-10">
        <li>Edit your harvest or post-harvest tip.</li>
        <li>Once submitted, your tip will need to be reviewed by an admin again.</li>
        <li>Once reviewed and approved, your tip will be made public and appear on the plant profile.</li>
      </ol>
      <section className="bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Edit tip for {fetchedTip?.wild_plant?.common_name}</h1>
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
              value={tip.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="plant_part">Plant Part:</label>
            <select
              value={tip.plant_part}
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
              value={tip.description}
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
                value={tip.image}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleSaveButtonClick}
              className="btn"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </section>
  )
}