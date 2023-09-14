import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteHarvestLog, getCurrentUsersHarvestLogs } from "../../managers/HarvestLogsManager"

export const UserHarvestLogs = () => {
    const navigate = useNavigate()
    const [harvestLogs, setHarvestLogs] = useState([])


    useEffect(() => {
        getCurrentUsersHarvestLogs().then((usersLogs) => { setHarvestLogs(usersLogs) })
    }, [])


    const deleteLog = (logId) => {
        const userConfirmed = window.confirm("Are you sure you want to PERMANENTLY DELETE this harvest log? This cannot be undone.");
        if (userConfirmed) {
            deleteHarvestLog(logId)
                .then(() => {
                    getCurrentUsersHarvestLogs().then((usersLogs) => { setHarvestLogs(usersLogs) })
                })
        }
    }

    return <>
        <button className="btn btn-1 btn-sep icon-send"
            onClick={() => { navigate(`/harvest-log-form`) }}
        >Log a Harvest</button>
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
                    <div>Harvested:
                        <Link to={`/edible-profile/${harvestLog.wild_plant.id}`}> {harvestLog.wild_plant.common_name}</Link> {harvestLog.plant_part.label}</div>
                    <div>Date of Harvest: {harvestLog.date}</div>
                    <div>Coordinates: {harvestLog.latitude}, {harvestLog.longitude}</div>
                    <div>{harvestLog.isPublicLocation ?
                        "This is a public location"
                        : "This is a private location"}</div>
                    <div>Quantity: {harvestLog.quantity}</div>
                    <div>Description: {harvestLog.description}</div>
                    <button className="btn btn-1 btn-sep icon-send"
                        onClick={() => { navigate(`/edit-harvest-log/${harvestLog.id}`) }}
                    >Edit</button>
                    <button className="btn btn-1 btn-sep icon-send"
                        onClick={() => { deleteLog(harvestLog.id) }}
                    >Delete</button>
                </section>
            ))}
        </article></>
}