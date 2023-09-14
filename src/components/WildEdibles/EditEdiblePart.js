import { useEffect, useState } from "react"
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
        image: ""
    })
    const navigate = useNavigate()


    useEffect(() => {
        if (partId) {
            getEdiblePartById(partId).then((part) => { setFetchedPart(part) })
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
            image: fetchedPart.image
            })
        }

    }, [fetchedPart])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /* const partToSend = {
            id: ediblePart.id,
            wild_plant: ediblePart.wild_plant,
            plant_part: ediblePart.plant_part,
            usability: ediblePart.usability,
            harvest_start: ediblePart.harvest_start,
            harvest_end: ediblePart.harvest_end,
            image: ediblePart.image
        } */

        updatePart(partId, ediblePart)
            .then(() => {
                navigate(`/manage-edible-profile/${ediblePart.wild_plant}`)
            })
    }

    const handleEdit = (event) => {
        const copy = { ...ediblePart }
        copy[event.target.name] = event.target.value
        setEdiblePart(copy)
    }

    return (<section className="">
        <section className="">
            <h1>Edit an Edible Part</h1>
            <form>
                <fieldset>
                    <div className="">
                        <label htmlFor="">Plant Part:</label>
                        <select value={parseInt(ediblePart.plant_part)}
                            required autoFocus
                            name="plant_part"
                            onChange={(event) => {
                                const copy = { ...ediblePart }
                                copy.plant_part = parseInt(event.target.value)
                                setEdiblePart(copy)} }>
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
                        <select value={ediblePart.usability}
                            required
                            name="usability"
                            onChange={(event) => {
                                const copy = { ...ediblePart }
                                copy.usability = parseInt(event.target.value)
                                setEdiblePart(copy)}} >
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
                        <select value={ediblePart.harvest_start}
                            required
                            name="harvest_start"
                            onChange={handleEdit} >
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
                        <select value={ediblePart.harvest_end}
                            required
                            name="harvest_end"
                            onChange={handleEdit} >
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
                            value={ediblePart.image}
                            onChange={handleEdit} />
                    </div>
                </fieldset>




                <div className="btn">
                    <button
                        onClick={handleSaveButtonClick}
                        className="btn"
                    >Save Edible Part</button>
                    <button className="btn btn-1 btn-sep icon-send"
                        onClick={() => { navigate(`/manage-edible-profile/${ediblePart.wild_plant}`) }}
                    >Cancel</button>
                </div>
            </form>
        </section>
    </section>
    )
}

