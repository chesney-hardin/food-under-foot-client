import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getWildPlants } from "../../managers/WildPlantsManager"
import { getPlantParts } from "../../managers/PlantPartsManager"
import { postNewHarvestLog } from "../../managers/HarvestLogsManager"

export const HarvestLogForm = () => {
    const [plantParts, setPlantParts] = useState([])
    const [plants, setPlants] = useState([])
    const [newHarvestLog, setNewHarvestLog] = useState({
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
        isPublic: 0
    })

    const navigate = useNavigate()


    useEffect(() => {
        getWildPlants().then((plantData) => setPlants(plantData))
        getPlantParts().then((parts) => setPlantParts(parts))
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        postNewHarvestLog(newHarvestLog)
            .then(() => {
                navigate(`/user-harvest-logs`)
            })
    }

    const handleChange = (event) => {
        const copy = { ...newHarvestLog }
        copy[event.target.name] = event.target.value
        setNewHarvestLog(copy)
    }

    return (<section className="">

        <section className="">
            <h1>Log a Harvest:</h1>
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
                            value={newHarvestLog.title}
                            onChange={handleChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="">Plant:</label>
                        <select value={newHarvestLog.wild_plant}
                            required
                            name="wild_plant"
                            onChange={(event) => {
                                const copy = { ...newHarvestLog }
                                copy.wild_plant = parseInt(event.target.value)
                                setNewHarvestLog(copy)
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
                        <select value={newHarvestLog.plant_part}
                            required
                            name="plant_part"
                            onChange={(event) => {
                                const copy = { ...newHarvestLog }
                                copy.plant_part = parseInt(event.target.value)
                                setNewHarvestLog(copy)
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
                            value={newHarvestLog.date}
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
                            value={newHarvestLog.quantity}
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
                            value={newHarvestLog.latitude}
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
                            value={newHarvestLog.longitude}
                            onChange={handleChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="isPublicLocation">Was the location public or private property?</label>
                        <select value={newHarvestLog.isPublicLocation}
                            required
                            name="isPublicLocation"
                            onChange={(event) => {
                                const copy = { ...newHarvestLog }
                                copy.isPublicLocation = JSON.parse(event.target.value)
                                setNewHarvestLog(copy)
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
                        <select value={newHarvestLog.isPublic}
                            required
                            name="isPublic"
                            onChange={(event) => {
                                const copy = { ...newHarvestLog }
                                copy.isPublic = JSON.parse(event.target.value)
                                setNewHarvestLog(copy)
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
                            value={newHarvestLog.description}
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
                            value={newHarvestLog.image}
                            onChange={handleChange} />
                    </div>
                </fieldset>

                <div className="btn">
                    <button
                        onClick={handleSaveButtonClick}
                        className="btn"
                    >Create Harvest Log</button>
                </div>
            </form>
        </section>
    </section>
    )
}