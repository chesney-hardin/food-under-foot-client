import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSinglePlant, updatePlant } from "../../managers/WildPlantsManager"

export const EditEdibleProfileForm = () => {
  const { plantId } = useParams()
  const [plant, setPlant] = useState({
    common_name: "",
    latin_name: "",
    alternate_names: "",
    latin_family: "",
    description: "",
    image: "",
    link_to_usda: "",
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (plantId) {
      getSinglePlant(plantId).then((plantData) => setPlant(plantData))
    }
  }, [plantId])

  const handleSaveButtonClick = (event) => {
    event.preventDefault()

    const plantToSend = {
      id: plant.id,
      common_name: plant.common_name,
      latin_name: plant.latin_name,
      alternate_names: plant.alternate_names,
      latin_family: plant.latin_family,
      description: plant.description,
      image: plant.image,
      link_to_usda: plant.link_to_usda,
      created_by: plant.created_by,
    }

    updatePlant(plantId, plantToSend).then(() => {
      navigate(`/manage-edible-profile/${plantId}`)
    })
  }

  const handleEdit = (event) => {
    const copy = { ...plant }
    copy[event.target.name] = event.target.value
    setPlant(copy)
  }

  return (
    <section className="p-4 bg-white">
      <section className="bg-white p-12 rounded-lg shadow-lg mx-20">
        <h1 className="text-2xl font-semibold mb-4">
          Edit Plant Profile for {plant.common_name}:
        </h1>
        <form>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <fieldset className="mb-4">
              <label htmlFor="commonName">Most Popular Common Name:</label>
              <input
                required
                autoFocus
                type="text"
                className="mt-1 block w-64 h-8 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                name="common_name"
                value={plant.common_name}
                onChange={handleEdit}
              />

            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="latinName">Latin Name:</label>
              <input
                required
                type="text"
                className="mt-1 block w-64 h-8 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                name="latin_name"
                value={plant.latin_name}
                onChange={handleEdit}
              />
            </fieldset>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <fieldset className="mb-4">

              <label htmlFor="alternateNames">Other Common Names:</label>
              <input
                required
                type="text"
                className="mt-1 block w-64 h-8 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                name="alternate_names"
                value={plant.alternate_names}
                onChange={handleEdit}
              />
            </fieldset>

            <fieldset className="mb-4">
              <label htmlFor="latinFamily">Latin Family:</label>
              <input
                required
                type="text"
                className="mt-1 block w-64 h-8 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                name="latin_family"
                value={plant.latin_family}
                onChange={handleEdit}
              />
            </fieldset>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <fieldset className="mb-4">
              <label>Image:</label>
              <input
                required
                type="text"
                className="mt-1 block w-64 h-8 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                name="image"
                value={plant.image}
                onChange={handleEdit}
              />
            </fieldset>
            <fieldset className="mb-4">
              <label>USDA Plant Profile Link:</label>
              <input
                required
                type="text"
                className="mt-1 block w-64 h-8 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                name="link_to_usda"
                value={plant.link_to_usda}
                onChange={handleEdit}
              />
            </fieldset>
          </div>
          <div className="w-full">
            <fieldset className="mb-4">
              <label>Description:</label>
              <textarea
                required
                className="mt-1 block w-full h-40 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                name="description"
                value={plant.description}
                onChange={handleEdit}
              >
                Growing conditions, companion plants, botanical description, etc....
              </textarea>
            </fieldset>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSaveButtonClick}
              className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
            >
              Save Plant Profile
            </button>
          </div>
        </form>
      </section>
    </section >
  )
}
