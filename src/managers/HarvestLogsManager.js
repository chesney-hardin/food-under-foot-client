export const getPublicHarvestLogsByPlantId = (plantId) => {
    return fetch(`http://localhost:8000/harvestlogs?public&plant=${plantId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const postNewHarvestLog = (newHarvestLog) => {
    return fetch("http://localhost:8000/harvestlogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        },
        body: JSON.stringify(newHarvestLog)
    }).then(res => res.json())
}

