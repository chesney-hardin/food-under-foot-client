import { useEffect, useState } from "react"
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
        image: ""
    })


    useEffect(() => {
        getUsabilityTypes().then((types) => setUsabilityTypes(types))
        getPlantParts().then((parts) => setPlantParts(parts))

    }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        postNewEdiblePart(newEdiblePart)
            .then(() => {
                setShowEdiblePartForm(false)
                getEdiblePartsOfAPlant(plant.id).then((plantData) => setEdibleParts(plantData))
            })
    }

    const handleChange = (event) => {
        const copy = { ...newEdiblePart }
        copy[event.target.name] = event.target.value
        setNewEdiblePart(copy)
    }

    return (<section className="">
        <section className="">
            <h1>Add an Edible Part</h1>
            <form>
                <fieldset>
                    <div className="">
                        <label htmlFor="">Plant Part:</label>
                        <select value={newEdiblePart.plant_part}
                            required autoFocus
                            name="plant_part"
                            onChange={handleChange} >
                            <option value="0">Select Edible Part</option>
                            {plantParts.map((plantPart) =>
                                <option key={`plantPart--${plantPart.id}`} value={plantPart.id}>{plantPart.label}</option>
                            )}

                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="">Use Type:</label>
                        <select value={newEdiblePart.usability}
                            required
                            name="usability"
                            onChange={handleChange} >
                            <option value="0">Use Type</option>
                            {usabilityTypes.map((type) =>
                                <option key={`type--${type.id}`} value={type.id}>{type.label}</option>
                            )}

                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="">Harvest Month Start:</label>
                        <select value={newEdiblePart.harvest_start}
                            required
                            name="harvest_start"
                            onChange={handleChange} >
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
                    <div className="">
                        <label htmlFor="">Harvest Month End:</label>
                        <select value={newEdiblePart.harvest_end}
                            required
                            name="harvest_end"
                            onChange={handleChange} >
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
                    <div className="">
                        <label>Image:</label>
                        <input
                            required
                            type="text"
                            style={{
                                height: "2rem"
                            }}
                            className="form-control"
                            placeholder="Link to an image..."
                            name="image"
                            value={newEdiblePart.image}
                            onChange={handleChange} />
                    </div>
                </fieldset>




                <div className="btn">
                    <button
                        onClick={handleSaveButtonClick}
                        className="btn"
                    >Add Edible Part</button>
                    <button className="btn btn-1 btn-sep icon-send"
                        onClick={() => { setShowEdiblePartForm(false) }}
                    >Cancel</button>
                </div>
            </form>
        </section>
    </section>
    )
}

