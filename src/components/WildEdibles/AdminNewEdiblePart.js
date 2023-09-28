import React, { useEffect, useState } from "react"
import { getUsabilityTypes } from "../../managers/UsabilityTypesManager"
import { getEdiblePartsOfAPlant } from "../../managers/EdiblePartsManager"
import { getPlantParts, postNewEdiblePart } from "../../managers/PlantPartsManager"

export const AdminNewEdiblePart = ({ plant, setShowEdiblePartForm, setEdibleParts }) => {
  const [usabilityTypes, setUsabilityTypes] = useState([])
  const [plantParts, setPlantParts] = useState([])
  const [newEdiblePart, setNewEdiblePart] = useState({
    wild_plant: plant.id,
    plant_part: 0,
    usability: 0,
    harvest_start: "",
    harvest_end: "",
    image: "",
  })

  useEffect(() => {
    getUsabilityTypes().then((types) => setUsabilityTypes(types))
    getPlantParts().then((parts) => setPlantParts(parts))
  }, [])

  const handleSaveButtonClick = (event) => {
    event.preventDefault()
    postNewEdiblePart(newEdiblePart).then(() => {
      setShowEdiblePartForm(false)
      getEdiblePartsOfAPlant(plant.id).then((plantData) => setEdibleParts(plantData))
    })
  }

  const handleChange = (event) => {
    const copy = { ...newEdiblePart }
    copy[event.target.name] = event.target.value
    setNewEdiblePart(copy)
  }

  return (
    <section className="bg-gray-100">
      <section className="bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-2xl font-semibold mb-4">Add an Edible Part</h1>
        <form>
          <fieldset>
            <div className="mb-4">
              <label htmlFor="plant_part">Plant Part:</label>
              <select
                value={newEdiblePart.plant_part}
                required
                autoFocus
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
          </fieldset>
          <fieldset>
            <div className="mb-4">
              <label htmlFor="usability">Use Type:</label>
              <select
                value={newEdiblePart.usability}
                required
                name="usability"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              >
                <option value="0">Use Type</option>
                {usabilityTypes.map((type) => (
                  <option key={`type--${type.id}`} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div className="mb-4">
              <label htmlFor="harvest_start">Harvest Month Start:</label>
              <select
                value={newEdiblePart.harvest_start}
                required
                name="harvest_start"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              >
                <option value="0">Start Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div className="mb-4">
              <label htmlFor="harvest_end">Harvest Month End:</label>
              <select
                value={newEdiblePart.harvest_end}
                required
                name="harvest_end"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              >
                <option value="0">End Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div className="mb-4">
              <label htmlFor="image">Image:</label>
              <input
                required
                type="text"
                style={{
                  height: "2rem",
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="Link to an image..."
                name="image"
                value={newEdiblePart.image}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <div className="btn">
            <button
              onClick={handleSaveButtonClick}
              className="mr-1 btn"
            >
              Add Edible Part
            </button>
            <button
              className="btn"
              onClick={() => {
                setShowEdiblePartForm(false)
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </section>
  )
}

