import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getWildPlants } from "../../managers/WildPlantsManager"
import { getPlantParts } from "../../managers/PlantPartsManager"
import { getHarvestLogById, updateHarvestLog } from "../../managers/HarvestLogsManager"

export const HarvestLogEditForm = () => {
    const { harvestLogId } = useParams()
    const [plantParts, setPlantParts] = useState([])
    const [plants, setPlants] = useState([])
    const [fetchedLog, setFetchedLog] = useState({})
    const [harvestLog, setHarvestLog] = useState({
        wild_plant: 0,
        plant_part: 0,
        latitude: 0,
        longitude: 0,
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
        if (harvestLogId) {
            getHarvestLogById(harvestLogId).then((logData) => setFetchedLog(logData))
        }
    }, [harvestLogId])

    useEffect(() => {
        if (fetchedLog.id) {
            setHarvestLog({
                id: fetchedLog.id,
                user: fetchedLog.user.id,
                wild_plant: fetchedLog.wild_plant.id,
                plant_part: fetchedLog.plant_part.id,
                latitude: fetchedLog.latitude,
                longitude: fetchedLog.longitude,
                date: fetchedLog.date,
                isPublicLocation: fetchedLog.isPublicLocation,
                quantity: fetchedLog.quantity,
                title: fetchedLog.title,
                description: fetchedLog.description,
                image: fetchedLog.image,
                isPublic: fetchedLog.isPublic,
            })
        }
    }, [fetchedLog])

    useEffect(() => {
        getWildPlants().then((plantData) => setPlants(plantData))
        getPlantParts().then((parts) => setPlantParts(parts))
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        updateHarvestLog(harvestLogId, harvestLog).then(() => {
            navigate(`/user-harvest-logs`)
        })
    }

    const handleChange = (event) => {
        const copy = { ...harvestLog }
        copy[event.target.name] = event.target.value
        setHarvestLog(copy)
    }

    return (
        <section className="p-6">
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Edit Harvest Log:</h1>
                <form>
                
                    <fieldset className="mb-4">
                        <label htmlFor="title" className="block font-semibold mb-1">
                            Title:
                        </label>
                        <input
                            required
                            autoFocus
                            type="text"
                            className="form-input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-fuf-teal"
                            placeholder="Awesome harvest adventure..."
                            name="title"
                            value={harvestLog.title}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <fieldset className="mb-4">
                        <label htmlFor="wild_plant" className="block font-semibold mb-1">
                            Plant:
                        </label>
                        <select
                            value={harvestLog.wild_plant}
                            required
                            className="form-select w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-fuf-teal"
                            name="wild_plant"
                            onChange={(event) => {
                                const copy = { ...harvestLog }
                                copy.wild_plant = parseInt(event.target.value)
                                setHarvestLog(copy)
                            }}
                        >
                            <option value="0">Select Wild Edible</option>
                            {plants.map((plant) => (
                                <option
                                    key={`plant--${plant.id}`}
                                    value={plant.id}
                                >{`${plant.common_name} (${plant.latin_name})`}</option>
                            ))}
                        </select>
                    </fieldset>
                
                    <fieldset className="mb-4">
                        <label
                            htmlFor="plant_part"
                            className="block font-semibold mb-1"
                        >
                            Part Harvested:
                        </label>
                        <select
                            value={harvestLog.plant_part}
                            required
                            className="form-select w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-fuf-teal"
                            name="plant_part"
                            onChange={(event) => {
                                const copy = { ...harvestLog }
                                copy.plant_part = parseInt(event.target.value)
                                setHarvestLog(copy)
                            }}
                        >
                            <option value="0">Select Edible Part</option>
                            {plantParts.map((plantPart) => (
                                <option
                                    key={`plantPart--${plantPart.id}`}
                                    value={plantPart.id}
                                >{plantPart.label}</option>
                            ))}
                        </select>
                    </fieldset>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <fieldset className="mb-4">
                        <label htmlFor="date" className="block font-semibold mb-1">
                            Date of Harvest:
                        </label>
                        <input
                            required
                            type="date"
                            className="form-input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-fuf-teal"
                            name="date"
                            value={harvestLog.date}
                            onChange={handleChange}
                        />
                    </fieldset>
                  
                    <fieldset className="mb-4">
                        <label htmlFor="quantity" className="block font-semibold mb-1">
                            Quantity:
                        </label>
                        <input
                            required
                            type="text"
                            className="form-input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-fuf-teal"
                            placeholder="How many pounds, gallons, bushels, etc..."
                            name="quantity"
                            value={harvestLog.quantity}
                            onChange={handleChange}
                        />
                    </fieldset>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <fieldset className="mb-4">
                        <label
                            htmlFor="latitude"
                            className="block font-semibold mb-1"
                        >
                            Harvest Location Latitude:
                        </label>
                        <input
                            required
                            type="number"
                            className="form-input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-fuf-teal"
                            placeholder="36.301549..."
                            name="latitude"
                            value={harvestLog.latitude}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label
                            htmlFor="longitude"
                            className="block font-semibold mb-1"
                        >
                            Harvest Location Longitude:
                        </label>
                        <input
                            required
                            type="number"
                            className="form-input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-fuf-teal"
                            placeholder="-86.770580..."
                            name="longitude"
                            value={harvestLog.longitude}
                            onChange={handleChange}
                        />
                    </fieldset>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <fieldset className="mb-4">
                        <label
                            htmlFor="isPublicLocation"
                            className="block font-semibold mb-1"
                        >
                            Was the location public or private property?
                        </label>
                        <select
                            value={harvestLog.isPublicLocation}
                            required
                            className="form-select w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-fuf-teal"
                            name="isPublicLocation"
                            onChange={(event) => {
                                const copy = { ...harvestLog }
                                copy.isPublicLocation = JSON.parse(event.target.value)
                                setHarvestLog(copy)
                            }}
                        >
                            <option value="0">Select</option>
                            <option value="true">Public</option>
                            <option value="false">Private</option>
                        </select>
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="isPublic" className="block font-semibold mb-1">
                            Make this harvest log public?
                        </label>
                        <select
                            value={harvestLog.isPublic}
                            required
                            className="form-select w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-fuf-teal"
                            name="isPublic"
                            onChange={(event) => {
                                const copy = { ...harvestLog }
                                copy.isPublic = JSON.parse(event.target.value)
                                setHarvestLog(copy)
                            }}
                        >
                            <option value="0">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </fieldset>
                    </div>
                    <fieldset className="mb-4">
                        <label htmlFor="image" className="block font-semibold mb-1">
                            Image:
                        </label>
                        <input
                            required
                            type="text"
                            className="form-input w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-fuf-teal"
                            placeholder="Link to an image of your harvest..."
                            name="image"
                            value={harvestLog.image}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset className="mb-4">
                        <label
                            htmlFor="description"
                            className="block font-semibold mb-1"
                        >
                            Description:
                        </label>
                        <textarea
                            required
                            className="form-textarea w-full h-48 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-fuf-teal"
                            name="description"
                            placeholder="Weather conditions, unexpected events, new tricks, things to remember..."
                            value={harvestLog.description}
                            onChange={handleChange}
                        ></textarea>
                    </fieldset>

                    <div className="text-end">
                        <button
                            onClick={handleSaveButtonClick}
                            className="btn"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </section>
        </section>
    )
}
