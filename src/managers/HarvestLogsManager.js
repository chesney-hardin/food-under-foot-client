export const getPublicHarvestLogs = () => {
    return fetch(`http://localhost:8000/harvestlogs`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}