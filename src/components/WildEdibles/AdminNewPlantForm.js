import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { postNewPlant } from "../../managers/WildPlantsManager"

export const AdminNewPlantForm = () => {
  const [newPlant, setNewPlant] = useState({
    common_name: "",
    latin_name: "",
    alternate_names: "",
    latin_family: "",
    description: "",
    image: "",
    link_to_usda: "",
  })

  const navigate = useNavigate()

  const handleSaveButtonClick = (event) => {
    event.preventDefault()

    postNewPlant(newPlant).then((plantCreated) => {
      const newPlantId = plantCreated.id
      navigate(`/manage-edible-profile/${newPlantId}`)
    })
  }

  const handleChange = (event) => {
    const copy = { ...newPlant }
    copy[event.target.name] = event.target.value
    setNewPlant(copy)
  }

  return (
    <section className="bg-gray-100 p-4">
      <ol className="border-fuf-green bg-fuf-teal bg-opacity-40 border rounded-lg p-8 shadow list-disc mx-24 my-10">
        <li>Add plant profile information.</li>
        <li>
          Use {
          <Link
            to="https://plants.usda.gov/home"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            USDA plants database 
          </Link>}
           to cross-reference plant information before sending to the database.
        </li>
        <li>Create profile.</li>
        <li>Add edible parts of the plant with their corresponding harvest season information.</li>
      </ol>
      <section className="bg-white p-4 rounded-lg shadow-lg mx-5">
        <h1 className="text-2xl font-semibold mb-4">Create a New Plant Profile:</h1>
        <form>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
            <div>
              <label htmlFor="commonName" className="block text-sm font-medium text-gray-700">
                Most Popular Common Name:
              </label>
              <input
                required
                autoFocus
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="Dandelion..."
                name="common_name"
                value={newPlant.common_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="latinName" className="block text-sm font-medium text-gray-700">
                Latin Name:
              </label>
              <input
                required
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="Taraxacum officinale..."
                name="latin_name"
                value={newPlant.latin_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
            <div>
              <label htmlFor="alternateNames" className="block text-sm font-medium text-gray-700">
                Other Common Names:
              </label>
              <input
                required
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="lion's tooth, wild endive..."
                name="alternate_names"
                value={newPlant.alternate_names}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="latinFamily" className="block text-sm font-medium text-gray-700">
                Latin Family:
              </label>
              <input
                required
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="Asteraceae - Aster family..."
                name="latin_family"
                value={newPlant.latin_family}
                onChange={handleChange}
              />
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
              value={newPlant.description}
              onChange={handleChange}
              rows="5"
            >
              Growing conditions, companion plants, botanical description, etc....
            </textarea>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image:
              </label>
              <input
                required
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="Link to an image of the plant..."
                name="image"
                value={newPlant.image}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="linkToUsda" className="block text-sm font-medium text-gray-700">
                USDA Plant Profile Link:
              </label>
              <input
                required
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="USDA plant profile link..."
                name="link_to_usda"
                value={newPlant.link_to_usda}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleSaveButtonClick}
              className="btn"
            >
              Create Plant Profile
            </button>
          </div>
        </form>
      </section>
    </section>
  )
}
