import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSinglePlant, postNewPlant, updatePlant } from "../../managers/WildPlantsManager"

export const EditEdibleProfileForm = () => {
    const { plantId } = useParams()
    const [plant, setPlant] = useState({
        common_name: "",
        latin_name: "",
        alternate_names: "",
        latin_family: "",
        description: "",
        image: "",
        link_to_usda: ""
    })

    const navigate = useNavigate()

    useEffect(() => {
        if(plantId) {
            getSinglePlant(plantId)
            .then((plantData) => setPlant(plantData))
        }
    }, [plantId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const plantToSend = {
            id: plant.id,
            common_name: plant.common_name,
            latin_name: plant.latin_name,
            alternate_names: plant.alternate_names,
            latin_family: plant.latin_family,
            description: plant.description,
            image: plant.image,
            link_to_usda: plant.link_to_usda,
            created_by: plant.created_by
        }

        updatePlant(plantId, plantToSend)
            .then(() => {
                navigate(`/manage-edible-profile/${plantId}`)
            }) 
    }
    const handleEdit = (event) => {
        const copy = {...plant}
        copy[event.target.name] = event.target.value
        setPlant(copy)
    }

    return (<section className="">
        <section className="">
            <h1>Edit Plant Profile for {plant.common_name}:</h1>
            <form>
                <fieldset>
                    <div className="">
                        <label htmlFor="commonName">Most Popular Common Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            style={{
                                height: "2rem",
                                width: "15rem"
                            }}
                            className="form-control"
                            name="common_name"
                            value={plant.common_name}
                            onChange={handleEdit} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="latinName">Latin Name:</label>
                        <input
                            required
                            type="text"
                            style={{
                                height: "2rem",
                                width: "15rem"
                            }}
                            className="form-control"
                            name="latin_name"
                            value={plant.latin_name}
                            onChange={handleEdit} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="alternateNames">Other Common Names:</label>
                        <input
                            required
                            type="text"
                            style={{
                                height: "2rem",
                                width: "15rem"
                            }}
                            className="form-control"
                            name="alternate_names"
                            value={plant.alternate_names}
                            onChange={handleEdit} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="latinFamily">Latin Family:</label>
                        <input
                            required
                            type="text"
                            style={{
                                height: "2rem",
                                width: "15rem"
                            }}
                            className="form-control"
                            name="latin_family"
                            value={plant.latin_family}
                            onChange={handleEdit}/>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label>Description:</label>
                        <textarea
                            required
                            style={{
                                height: "5rem",
                                width: "25rem"
                            }}
                            className="form-control"
                            name="description"
                            value={plant.description}
                            onChange={handleEdit} >
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
                                height: "2rem",
                                width: "15rem"
                            }}
                            className="form-control"
                            name="image"
                            value={plant.image}
                            onChange={handleEdit} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label>USDA Plant Profile Link:</label>
                        <input
                            required
                            type="text"
                            style={{
                                height: "2rem",
                                width: "15rem"
                            }}
                            className="form-control"
                            name="link_to_usda"
                            value={plant.link_to_usda}
                            onChange={handleEdit}/>
                    </div>
                </fieldset>



                <div className="btn">
                    <button
                        onClick={handleSaveButtonClick}
                        className="btn"
                    >Save Plant Profile</button>
                </div>
            </form>
        </section>
    </section>
    )
}