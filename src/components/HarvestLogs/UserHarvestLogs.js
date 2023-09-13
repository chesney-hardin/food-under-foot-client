import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPublicHarvestLogsByPlantId } from "../../managers/HarvestLogsManager"

export const UserHarvestLogs = () => {
    const { plantId } = useParams()
    const navigate = useNavigate()
    const [harvestLogs, setHarvestLogs] = useState([])


    useEffect(() => {
        if (plantId) {
            getPublicHarvestLogsByPlantId(plantId).then((harvestData) => setHarvestLogs(harvestData))
        }
    }, [])


    return <>
        <button className="btn btn-1 btn-sep icon-send"
            onClick={() => { navigate(`/edible-profile/${plantId}`) }}
        >Back to Plant Profile</button>
        <article>
            {harvestLogs.map((harvestLog) => (
                <section
                    key={`harvestLog--${harvestLog.id}`}
                    style={{
                        border: '1px solid #000',
                        padding: '10px',
                    }}>
                    <h3>{harvestLog.title}</h3>
                    <img src={harvestLog.image} alt="image of harvest" style={{ maxWidth: '200px' }} />
                    <div>Harvested: {harvestLog.wild_plant.common_name} {harvestLog.plant_part.label}</div>
                    <div>Posted by: {harvestLog.user.first_name} {harvestLog.user.last_name}</div>
                    <div>Coordinates: {harvestLog.latitude}, {harvestLog.longitude}</div>
                    <div>{harvestLog.isPublicLocation ?
                        "This is a public location"
                        : "This is a private location"}</div>
                    <div>Quantity: {harvestLog.quantity}</div>
                    <div>Description: {harvestLog.description}</div>
                </section>
            ))}
        </article></>
}