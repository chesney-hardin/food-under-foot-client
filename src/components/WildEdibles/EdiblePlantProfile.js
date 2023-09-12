import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getEdiblePartsOfAPlant, getSinglePlant } from "../../managers/WildPlantsManager"

export const EdiblePlantProfile = () => {
    const { plantId } = useParams()
    const navigate = useNavigate()
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

    return <>
        <section style={{ border: '1px solid #000', padding: '10px' }}>
            <img src={plant.image} alt="image of edible plant" style={{ maxHeight: '300px' }} />
            <div>{plant.common_name.toUpperCase()} ({plant.latin_name})</div>
            <div>Latin family: {plant.latin_family}</div>
            <div>Other common names: {plant.alternate_names}</div>
            <div>Description: {plant.description}</div>
            <Link className="nav-link" to={plant.link_to_usda} target="_blank" rel="noopener noreferrer">More Plant Information</Link>
            <div>Edible Parts: {edibleParts.map((part) =>
                <article>
                    <div>{part.plant_part.label}</div>
                    <div>{convertHarvestMonth(part.harvest_start)} - {convertHarvestMonth(part.harvest_end)}</div>
                    <img src={part.usability.icon} style={{ maxHeight: '50px' }} />
                </article>
            )}</div>
        </section>
    </>
}


