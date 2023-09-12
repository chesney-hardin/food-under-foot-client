import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUsabilityTypes } from "../../managers/UsabilityTypesManager"
import { getEdiblePartsOfAPlant } from "../../managers/EdiblePartsManager"
import { getPlantParts, postNewEdiblePart } from "../../managers/PlantPartsManager"

export const AdminNewEdiblePart = ({ plant, setShowEdiblePartForm, setEdibleParts }) => {
    const { plantId } = useParams()
    const [usabilityTypes, setUsabilityTypes] = useState([])
    const [plantParts, setPlantParts] = useState([])
    /*  const [currentPlant, setCurrentPlant] = useState({
         common_name: "",
         latin_name: "",
         alternate_names: "",
         latin_family: "",
         description: "",
         image: "",
         link_to_usda: ""
     }) */
    const [newEdiblePart, setNewEdiblePart] = useState({
        wild_plant: plant.id,
        plant_part: 0,
        usability: 0,
        harvest_start: "",
        harvest_end: "",
        image: ""
    })

    const navigate = useNavigate()

    useEffect(() => {
            //getSinglePlant(plantId).then((plant) => setCurrentPlant(plant))
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

    return (<section className="">
        <section className="">
            <h1>Add an Edible Part</h1>
            <form>
                <fieldset>
                    <div className="">
                        <label htmlFor="">Plant Part:</label>
                        <select value={newEdiblePart.plant_part}
                        required autoFocus
                            onChange={
                                (evt) => {
                                    const copy = { ...newEdiblePart }
                                    copy.plant_part = JSON.parse(evt.target.value)
                                    setNewEdiblePart(copy)
                                }
                            } >
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
                            onChange={
                                (evt) => {
                                    const copy = { ...newEdiblePart }
                                    copy.usability = JSON.parse(evt.target.value)
                                    setNewEdiblePart(copy)
                                }
                            } >
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
                            onChange={
                                (evt) => {
                                    const copy = { ...newEdiblePart }
                                    copy.harvest_start = evt.target.value
                                    setNewEdiblePart(copy)
                                }
                            } >
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
                            onChange={
                                (evt) => {
                                    const copy = { ...newEdiblePart }
                                    copy.harvest_end = evt.target.value
                                    setNewEdiblePart(copy)
                                }
                            } >
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
                            value={newEdiblePart.image}
                            onChange={
                                (evt) => {
                                    const copy = { ...newEdiblePart }
                                    copy.image = evt.target.value
                                    setNewEdiblePart(copy)
                                }
                            } />
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

