import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSinglePlant, getWildPlants } from "../../managers/WildPlantsManager"
import { getPlantParts } from "../../managers/PlantPartsManager"
import { postNewHarvestLog } from "../../managers/HarvestLogsManager"
import { SelectCoordinatesMap } from "./SelectCoordinatesMap"

export const HarvestLogForm = () => {
  const { plantId } = useParams()
  const [plantParts, setPlantParts] = useState([])
  const [plants, setPlants] = useState([])
  const [newHarvestLog, setNewHarvestLog] = useState({
    wild_plant: 0,
    plant_part: 0,
    latitude: undefined,
    longitude: undefined,
    date: "",
    isPublicLocation: 0,
    quantity: "",
    title: "",
    description: "",
    image: "",
    isPublic: 0,
  })

  const navigate = useNavigate()

  useEffect(() => {
    getWildPlants().then((plantData) => setPlants(plantData))
    getPlantParts().then((parts) => setPlantParts(parts))
  }, [])

  useEffect(() => {
    if(plantId){
      const copy = { ...newHarvestLog }
      getSinglePlant(plantId).then((plantData) => {
        copy.wild_plant = plantData.id
        setNewHarvestLog(copy)
      })}
  }, [plantId])

  const handleSaveButtonClick = (event) => {
    event.preventDefault()
    postNewHarvestLog(newHarvestLog).then(() => {
      if(plantId) {
      navigate(`/edible-profile/${plantId}`)
      } else{
        navigate(`/user-harvest-logs`)
      }
    })
  }

  const handleChange = (event) => {
    const copy = { ...newHarvestLog }
    copy[event.target.name] = event.target.value
    setNewHarvestLog(copy)
  }

  return (
    <section className="p-4 bg-white">
      <section className="bg-white p-12 rounded-lg shadow-lg mx-20">
        <h1 className="text-2xl font-semibold mb-4">Log a Harvest:</h1>
        <SelectCoordinatesMap newHarvestLog={newHarvestLog} setNewHarvestLog={setNewHarvestLog} />
        <form>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <fieldset className="mb-4">
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                Harvest Location Latitude:
              </label>
              <input
                required
                type="float"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="36.301549..."
                name="latitude"
                value={newHarvestLog.latitude}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="mb-4">
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                Harvest Location Longitude:
              </label>
              <input
                required
                type="float"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="-86.770580..."
                name="longitude"
                value={newHarvestLog.longitude}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="mb-4">
              <label htmlFor="isPublicLocation" className="block text-sm font-medium text-gray-700">
                Was the location public or private property?
              </label>
              <select
                value={newHarvestLog.isPublicLocation}
                required
                name="isPublicLocation"
                onChange={(event) => {
                  const copy = { ...newHarvestLog }
                  copy.isPublicLocation = JSON.parse(event.target.value)
                  setNewHarvestLog(copy)
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              >
                <option value="0">Select</option>
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
            </fieldset>
          </div>

          <fieldset className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              required
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              placeholder="Awesome harvest adventure..."
              name="title"
              value={newHarvestLog.title}
              onChange={handleChange}
            />
          </fieldset>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <fieldset className="mb-4">
              <label htmlFor="wild_plant" className="block text-sm font-medium text-gray-700">
                Plant:
              </label>
              <select
                value={newHarvestLog.wild_plant}
                required
                name="wild_plant"
                onChange={(event) => {
                  const copy = { ...newHarvestLog }
                  copy.wild_plant = parseInt(event.target.value)
                  setNewHarvestLog(copy)
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              >
                <option value="0">Select Wild Edible</option>
                {plants.map((plant) => (
                  <option key={`plant--${plant.id}`} value={plant.id}>
                    {plant.common_name} ({plant.latin_name})
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="mb-4">
              <label htmlFor="plant_part" className="block text-sm font-medium text-gray-700">
                Part Harvested:
              </label>
              <select
                value={newHarvestLog.plant_part}
                required
                name="plant_part"
                onChange={(event) => {
                  const copy = { ...newHarvestLog }
                  copy.plant_part = parseInt(event.target.value)
                  setNewHarvestLog(copy)
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              >
                <option value="0">Select Edible Part</option>
                {plantParts.map((plantPart) => (
                  <option key={`plantPart--${plantPart.id}`} value={plantPart.id}>
                    {plantPart.label}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <fieldset className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date of Harvest:
              </label>
              <input
                required
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                name="date"
                value={newHarvestLog.date}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <input
                required
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="How many pounds, gallons, bushels, etc..."
                name="quantity"
                value={newHarvestLog.quantity}
                onChange={handleChange}
              />
            </fieldset>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <fieldset className="mb-4">
              <label htmlFor="isPublic" className="block text-sm font-medium text-gray-700">
                Make this harvest log public?
              </label>
              <select
                value={newHarvestLog.isPublic}
                required
                name="isPublic"
                onChange={(event) => {
                  const copy = { ...newHarvestLog }
                  copy.isPublic = JSON.parse(event.target.value)
                  setNewHarvestLog(copy)
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              >
                <option value="0">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image:
              </label>
              <input
                required
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                placeholder="Link to an image of your harvest..."
                name="image"
                value={newHarvestLog.image}
                onChange={handleChange}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <textarea
                required
                className="mt-1 h-48 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                name="description"
                placeholder="Weather conditions, unexpected events, new tricks, tings to remember..."
                value={newHarvestLog.description}
                onChange={handleChange}
              ></textarea>
            </fieldset>

            <div className="mb-4 text-end">
              <button
                onClick={handleSaveButtonClick}
                className="btn"
              >
                Create Harvest Log
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  )
}
