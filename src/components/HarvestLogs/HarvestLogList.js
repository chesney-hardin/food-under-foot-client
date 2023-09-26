/* list all harvest logs, take props that indicate whether harvest logs should 
have edit/delete buttons and send the harvest logs as a prop */

import { useNavigate } from "react-router-dom"
import { deleteHarvestLog } from "../../managers/HarvestLogsManager"
import { getCurrentUsersHarvestLogs } from "../../managers/HarvestLogsManager"

export const HarvestLogList = ({ harvestLogs, setHarvestLogs, showEditDeleteButtons }) => {
    const navigate = useNavigate()

    const deleteLog = (logId) => {
        const userConfirmed = window.confirm(
            "Are you sure you want to PERMANENTLY DELETE this harvest log? This cannot be undone."
        );
        if (userConfirmed) {
            deleteHarvestLog(logId).then(() => {
                getCurrentUsersHarvestLogs().then((usersLogs) => {
                    setHarvestLogs(usersLogs)
                })
            })
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    return (
        <>
            <article className="p-4">
                {harvestLogs.map((harvestLog) => (
                    <section
                        key={`harvestLog--${harvestLog.id}`}
                        className=" rounded-md p-4 mb-4 flex shadow-lg"
                    >
                        <div className="w-1/3 pr-2">
                            <h3 className="text-xl font-semibold mb-2">{harvestLog.title}</h3>
                            <img
                                src={harvestLog.image}
                                alt="image of harvest"
                                className="max-h-36 rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="w-2/3 pl-2">
                            <div>
                                Harvested: {harvestLog.wild_plant.common_name}{" "}
                                {harvestLog.plant_part.label}
                            </div>
                            <div>
                                Date: {formatDate(harvestLog.date)}
                            </div>
                            <div>
                                Posted by: {harvestLog.user.first_name}{" "}
                                {harvestLog.user.last_name}
                            </div>
                            <div>
                                Coordinates: {harvestLog.latitude}, {harvestLog.longitude}
                            </div>
                            <div>
                                {harvestLog.isPublicLocation
                                    ? "This is a public location"
                                    : "This is a private location"}
                            </div>
                            <div>Quantity: {harvestLog.quantity}</div>
                            <div>Description: {harvestLog.description}</div>
                        </div>
                        {showEditDeleteButtons ?
                            <div>
                                <button
                                    className="px-4 py-2 m-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                                    onClick={() => {
                                        navigate(`/edit-harvest-log/${harvestLog.id}`);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                                    onClick={() => {
                                        deleteLog(harvestLog.id);
                                    }}
                                >
                                    Delete
                                </button> </div> : ""}
                    </section>
                ))}
            </article>
        </>
    )
}