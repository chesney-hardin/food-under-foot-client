export const getPublicHarvestLogsByPlantId = (plantId) => {
    return fetch(`http://localhost:8000/harvestlogs?public&plant=${plantId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const getPublicHarvestLogsByTitle = (plantId, searchTerm) => {
    return fetch(`http://localhost:8000/harvestlogs?public&plant=${plantId}&title=${searchTerm}`, {
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

export const getCurrentUsersHarvestLogs = () => {
    return fetch(`http://localhost:8000/harvestlogs?user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}
export const getUsersSearchHarvestLogs = (searchTerm) => {
    return fetch(`http://localhost:8000/harvestlogs?user&title=${searchTerm}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const deleteHarvestLog = (logId) => {
    return fetch(`http://localhost:8000/harvestlogs/${logId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    })
  }

  export const getHarvestLogById = (logId) => {
    return fetch(`http://localhost:8000/harvestlogs/${logId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const updateHarvestLog = (logId, log) => {
    return fetch(`http://localhost:8000/harvestlogs/${logId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        },
        body: JSON.stringify(log)
    })
}
