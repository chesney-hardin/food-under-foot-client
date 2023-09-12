import { useEffect, useState } from "react"
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
        link_to_usda: ""
    })

    const navigate = useNavigate()


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        postNewPlant(newPlant)
            .then(plantCreated => {
                const newPlantId = plantCreated.id
                navigate(`/manage-edible-profile/${newPlantId}`)
            })
    }

    return (<section className="">
        <ol style={{ border: '1px solid #000', padding: '10px' }}>
            <li>Add plant profile information.</li>
            <li>Use {<Link to="https://plants.usda.gov/home" target="_blank" rel="noopener noreferrer">USDA plants database</Link>} to cross reference plant information before sending to database.</li>
            <li>Create profile.</li>
            <li>Add edible parts of the plant with their corresponding harvest season information.</li>
        </ol>
        <section className="">
            <h1>Create a New Plant Profile:</h1>
            <form>
                <fieldset>
                    <div className="">
                        <label htmlFor="commonName">Most Popular Common Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            style={{
                                height: "2rem"
                            }}
                            className="form-control"
                            placeholder="Dandelion..."
                            value={newPlant.common_name}
                            onChange={
                                (evt) => {
                                    const copy = { ...newPlant }
                                    copy.common_name = evt.target.value
                                    setNewPlant(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="latinName">Latin Name:</label>
                        <input
                            required
                            type="text"
                            style={{
                                height: "2rem"
                            }}
                            className="form-control"
                            placeholder="Taraxacum officinale..."
                            value={newPlant.latin_name}
                            onChange={
                                (evt) => {
                                    const copy = { ...newPlant }
                                    copy.latin_name = evt.target.value
                                    setNewPlant(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="alternateNames">Other Common Names:</label>
                        <input
                            required
                            type="text"
                            style={{
                                height: "2rem"
                            }}
                            className="form-control"
                            placeholder="lion's tooth, wild endive..."
                            value={newPlant.alternate_names}
                            onChange={
                                (evt) => {
                                    const copy = { ...newPlant }
                                    copy.alternate_names = evt.target.value
                                    setNewPlant(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="latinFamily">Latin Family:</label>
                        <input
                            required
                            type="text"
                            style={{
                                height: "2rem"
                            }}
                            className="form-control"
                            placeholder="Asteraceae - Aster family..."
                            value={newPlant.latin_family}
                            onChange={
                                (evt) => {
                                    const copy = { ...newPlant }
                                    copy.latin_family = evt.target.value
                                    setNewPlant(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label>Description:</label>
                        <textarea
                            required
                            style={{
                                height: "5rem"
                            }}
                            className="form-control"
                            value={newPlant.description}
                            onChange={
                                (evt) => {
                                    const copy = { ...newPlant }
                                    copy.description = evt.target.value
                                    setNewPlant(copy)
                                }
                            } >
                            Growing conditions, companion plants, botanical description, etc....
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
                                height: "2rem"
                            }}
                            className="form-control"
                            placeholder="Link to an image of the plant..."
                            value={newPlant.image}
                            onChange={
                                (evt) => {
                                    const copy = { ...newPlant }
                                    copy.image = evt.target.value
                                    setNewPlant(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label>USDA Plant Profile Link:</label>
                        <input
                            required
                            type="text"
                            style={{
                                height: "2rem"
                            }}
                            className="form-control"
                            placeholder="USDA plant profile link..."
                            value={newPlant.link_to_usda}
                            onChange={
                                (evt) => {
                                    const copy = { ...newPlant }
                                    copy.link_to_usda = evt.target.value
                                    setNewPlant(copy)
                                }
                            } />
                    </div>
                </fieldset>



                <div className="btn">
                    <button
                        onClick={handleSaveButtonClick}
                        className="btn"
                    >Create Plant Profile</button>
                </div>
            </form>
        </section>
    </section>
    )
}
