export const getPublicHarvestLogsByPlantId = (plantId) => {
    return fetch(`http://localhost:8000/harvestlogs?public&plant=${plantId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}