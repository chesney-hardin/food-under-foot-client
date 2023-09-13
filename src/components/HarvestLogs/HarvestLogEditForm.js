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
      /*   wild_plant: 0,
        plant_part: 0,
        latitude: 0,
        longitude: 0,
        date: "",
        isPublicLocation: false,
        quantity: "",
        title: "",
        description: "",
        image: "",
        isPublic: false */
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
                isPublic: fetchedLog.isPublic

            })
        }
    }, [fetchedLog])

    useEffect(() => {
        getWildPlants().then((plantData) => setPlants(plantData))
        getPlantParts().then((parts) => setPlantParts(parts))
    }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        updateHarvestLog(harvestLogId, harvestLog)
            .then(() => {
                navigate(`/user-harvest-logs`)
            })
    }

    const handleChange = (event) => {
        const copy = { ...harvestLog }
        copy[event.target.name] = event.target.value
        setHarvestLog(copy)
    }

    return (<section className="">

        <section className="">
            <h1>Edit Harvest Log:</h1>
            <form>
                <fieldset>
                    <div className="">
                        <label htmlFor="title">Title:</label>
                        <input
                            required autoFocus
                            type="text"
                            style={{
                                height: "2rem",
                                width: "20rem"
                            }}
                            className="form-control"
                            placeholder="Awesome harvest adventure..."
                            name="title"
                            value={harvestLog.title}
                            onChange={handleChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="">Plant:</label>
                        <select value={harvestLog.wild_plant}
                            required
                            name="wild_plant"
                            onChange={(event) => {
                                const copy = { ...harvestLog }
                                copy.wild_plant = parseInt(event.target.value)
                                setHarvestLog(copy)
                            }} >
                            <option value="0">Select Wild Edible</option>
                            {plants.map((plant) =>
                                <option key={`plant--${plant.id}`} value={plant.id}>{plant.common_name} ({plant.latin_name})</option>
                            )}

                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="">Part Harvested:</label>
                        <select value={harvestLog.plant_part}
                            required
                            name="plant_part"
                            onChange={(event) => {
                                const copy = { ...harvestLog }
                                copy.plant_part = parseInt(event.target.value)
                                setHarvestLog(copy)
                            }} >
                            <option value="0">Select Edible Part</option>
                            {plantParts.map((plantPart) =>
                                <option key={`plantPart--${plantPart.id}`} value={plantPart.id}>{plantPart.label}</option>
                            )}

                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label>Date of Harvest:</label>
                        <input
                            required
                            type="date"
                            style={{
                                height: "2rem"
                            }}
                            className="form-control"
                            name="date"
                            value={harvestLog.date}
                            onChange={handleChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            required
                            type="text"
                            style={{
                                height: "2rem",
                                width: "20rem"
                            }}
                            className="form-control"
                            placeholder="How many pounds, gallons, bushels, etc..."
                            name="quantity"
                            value={harvestLog.quantity}
                            onChange={handleChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="latitude">Harvest Location Latitude:</label>
                        <input
                            required
                            type="float"
                            style={{
                                height: "2rem"
                            }}
                            className="form-control"
                            placeholder="36.301549..."
                            name="latitude"
                            value={harvestLog.latitude}
                            onChange={handleChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="longitude">Harvest Location Longitude:</label>
                        <input
                            required
                            type="float"
                            style={{
                                height: "2rem"
                            }}
                            className="form-control"
                            placeholder="-86.770580..."
                            name="longitude"
                            value={harvestLog.longitude}
                            onChange={handleChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="isPublicLocation">Was the location public or private property?</label>
                        <select value={harvestLog.isPublicLocation}
                            required
                            name="isPublicLocation"
                            onChange={(event) => {
                                const copy = { ...harvestLog }
                                copy.isPublicLocation = JSON.parse(event.target.value)
                                setHarvestLog(copy)
                            }} >
                            <option value="0">Select</option>
                            <option value="true">Public</option>
                            <option value="false">Private</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="">Make this harvest log public?</label>
                        <select value={harvestLog.isPublic}
                            required
                            name="isPublic"
                            onChange={(event) => {
                                const copy = { ...harvestLog }
                                copy.isPublic = JSON.parse(event.target.value)
                                setHarvestLog(copy)
                            }} >
                            <option value="0">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label>Description:</label>
                        <textarea
                            required
                            style={{
                                height: "5rem",
                                width: "20rem"
                            }}
                            className="form-control"
                            name="description"
                            placeholder="Weather conditions, unexpected events, new tricks, tings to remember..."
                            value={harvestLog.description}
                            onChange={handleChange} >
                        </textarea>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label>Image:</label>
                        <input
                            required
                            type="text"
                            style={{
                                height: "2rem",
                                width: "20rem"
                            }}
                            className="form-control"
                            placeholder="Link to an image of your harvest..."
                            name="image"
                            value={harvestLog.image}
                            onChange={handleChange} />
                    </div>
                </fieldset>

                <div className="btn">
                    <button
                        onClick={handleSaveButtonClick}
                        className="btn"
                    >Save Changes</button>
                </div>
            </form>
        </section>
    </section>
    )
}