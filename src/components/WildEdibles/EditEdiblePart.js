import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUsabilityTypes } from "../../managers/UsabilityTypesManager"
import { getEdiblePartById, updatePart } from "../../managers/EdiblePartsManager"
import { getPlantParts } from "../../managers/PlantPartsManager"

export const EditEdiblePart = () => {
  const { partId } = useParams()
  const [usabilityTypes, setUsabilityTypes] = useState([])
  const [plantParts, setPlantParts] = useState([])
  const [fetchedPart, setFetchedPart] = useState({})
  const [ediblePart, setEdiblePart] = useState({
    wild_plant: 0,
    plant_part: 0,
    usability: 0,
    harvest_start: "",
    harvest_end: "",
    image: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (partId) {
      getEdiblePartById(partId).then((part) => {
        setFetchedPart(part)
      })
      getUsabilityTypes().then((types) => setUsabilityTypes(types))
      getPlantParts().then((parts) => setPlantParts(parts))
    }
  }, [partId])

  useEffect(() => {
    if (fetchedPart.id) {
      setEdiblePart({
        id: fetchedPart.id,
        wild_plant: fetchedPart.wild_plant.id,
        plant_part: fetchedPart.plant_part.id,
        usability: fetchedPart.usability.id,
        harvest_start: fetchedPart.harvest_start,
        harvest_end: fetchedPart.harvest_end,
        image: fetchedPart.image,
      })
    }
  }, [fetchedPart])

  const handleSaveButtonClick = (event) => {
    event.preventDefault()

    updatePart(partId, ediblePart).then(() => {
      navigate(`/manage-edible-profile/${ediblePart.wild_plant}`)
    })
  }

  const handleEdit = (event) => {
    const copy = { ...ediblePart }
    copy[event.target.name] = event.target.value
    setEdiblePart(copy)
  }

  return (
    <section className="p-4">
      <section className="bg-white p-6 rounded-lg shadow-md max-w-max">
        <h1 className="text-2xl font-semibold mb-4">Edit an Edible Part</h1>
        <form className="max-w-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <fieldset className="mb-2">
              <label htmlFor="plant_part">Plant Part:</label>
              <select
                value={parseInt(ediblePart.plant_part)}
                required
                autoFocus
                name="plant_part"
                onChange={(event) => {
                  const copy = { ...ediblePart }
                  copy.plant_part = parseInt(event.target.value)
                  setEdiblePart(copy)
                }}
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
            </fieldset>

            <fieldset className="mb-2">
              <label htmlFor="usability">Use Type:</label>
              <select
                value={ediblePart.usability}
                required
                name="usability"
                onChange={(event) => {
                  const copy = { ...ediblePart }
                  copy.usability = parseInt(event.target.value)
                  setEdiblePart(copy)
                }}
                className="mt-1 block min-w-min rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              >
                <option value="0">Use Type</option>
                {usabilityTypes.map((type) => (
                  <option key={`type--${type.id}`} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <fieldset className="mb-2">
              <label htmlFor="">Harvest Month Start:</label>
              <select
                value={ediblePart.harvest_start}
                required
                name="harvest_start"
                onChange={handleEdit}
                className="mt-1 block min-w-min rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
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
            </fieldset>
          <fieldset>
            <div className="mb-2">
              <label htmlFor="">Harvest Month End:</label>
              <select
                value={ediblePart.harvest_end}
                required
                name="harvest_end"
                onChange={handleEdit}
                className="mt-1 block min-w-min rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
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
          </div>
          <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <div className="mb-2">
              <label>Image:</label>
              <input
                required
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="Link to an image..."
                name="image"
                value={ediblePart.image}
                onChange={(event) => {
                  const copy = { ...ediblePart }
                  copy.image = event.target.value
                  setEdiblePart(copy)
                }}
              />
            </div>
          </fieldset>

          <div className="space-x-2 mt-4">
            <button
              onClick={handleSaveButtonClick}
              className="btn"
            >
              Save Edible Part
            </button>
            <button
              className="btn"
              onClick={() => {
                navigate(`/manage-edible-profile/${ediblePart.wild_plant}`)
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
