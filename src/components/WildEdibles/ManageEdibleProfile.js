import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteWildPlant, getSinglePlant } from "../../managers/WildPlantsManager"
import { deleteEdiblePart, getEdiblePartsOfAPlant } from "../../managers/EdiblePartsManager"
import { AdminNewEdiblePart } from "./AdminNewEdiblePart"

export const ManageEdibleProfile = () => {
    const { plantId } = useParams()
    const navigate = useNavigate()
    const [showEdiblePartForm, setShowEdiblePartForm] = useState(false)
    const [plant, setPlant] = useState({
        id: 0,
        common_name: "",
        latin_name: "",
        alternate_names: "",
        latin_family: "",
        description: "",
        image: "",
        link_to_usda: "",
        created_by: 0,
        edible_parts: []
    })
    const [edibleParts, setEdibleParts] = useState([])

    useEffect(() => {
        getSinglePlant(plantId).then((plantData) => setPlant(plantData))
        getEdiblePartsOfAPlant(plantId).then((plantData) => setEdibleParts(plantData))
    }, [])

    const convertHarvestMonth = (monthData) => {
        const monthNumber = parseInt(monthData, 10)
        const date = new Date(`2023-${monthNumber}-01`)
        const monthName = date.toLocaleString('default', { month: 'long' })
        return monthName
    }

    const deletePlantProfile = (event) => {
        event.preventDefault()

        const userConfirmed = window.confirm("Are you sure you want to PERMANENTLY DELETE this plant profile from the database? This cannot be undone.");
        if (userConfirmed) {
            deleteWildPlant(plantId)
                .then(() => {
                    navigate(`/manage-edibles`)
                })
        }
    }
    const deletePart = (partId) => {

        deleteEdiblePart(partId)
            .then(() => {
                getEdiblePartsOfAPlant(plantId).then((plantData) => setEdibleParts(plantData))
            })
    }

    return <>
        <section style={{ border: '1px solid #000', padding: '10px' }}>
            <img src={plant.image} alt="image of edible plant" style={{ maxHeight: '300px' }} />
            <button className="btn btn-1 btn-sep icon-send"
                onClick={() => {navigate(`/harvest-logs/${plantId}`)}}
            >Public Harvest Logs</button>
            <button className="btn btn-1 btn-sep icon-send"
                onClick={() => { navigate(`/edit-edible-profile/${plantId}`) }}
            >Edit Plant Profile</button>
            <button className="btn btn-1 btn-sep icon-send"
                onClick={deletePlantProfile}
            >Delete Plant Profile</button>
            <div>{plant.common_name.toUpperCase()} ({plant.latin_name})</div>
            <div>Latin family: {plant.latin_family}</div>
            <div>Other common names: {plant.alternate_names}</div>
            <div>Description: {plant.description}</div>
            <Link className="nav-link" to={plant.link_to_usda} target="_blank" rel="noopener noreferrer">USDA Plant Profile for More Information</Link>
        </section>
        <div>==============================================================</div>
        <section>
            <div>Edible Parts: {edibleParts.map((part) =>
                <article 
                key={`part--${part.id}`}
                style={{ border: '1px solid #000', padding: '10px' }}>
                    <img src={part.image} alt="image of edible part" style={{ maxHeight: '100px' }} />
                    <div>{part.plant_part.label}</div>
                    <div>Harvest Season: {convertHarvestMonth(part.harvest_start)} - {convertHarvestMonth(part.harvest_end)}</div>
                    <img src={part.usability.icon} style={{ maxHeight: '50px' }} />
                    <button className="btn btn-1 btn-sep icon-send"
                        onClick={() => { navigate(`/edit-edible-part/${part.id}`) }}
                    >Edit Edible Part</button>
                        <button className="btn btn-1 btn-sep icon-send"
                            onClick={() => { deletePart(part.id) }}
                        >Delete Edible Part</button> 
                </article>
            )}</div>
            {showEdiblePartForm ?
                <AdminNewEdiblePart plant={plant} setShowEdiblePartForm={setShowEdiblePartForm} setEdibleParts={setEdibleParts} />
                : <button className="btn btn-1 btn-sep icon-send"
                    onClick={() => { setShowEdiblePartForm(true) }}
                >Add An Edible Part</button>}
        </section>
    </>
}
