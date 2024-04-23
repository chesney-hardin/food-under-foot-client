export const getWildPlants = () => {
    return fetch("https://goldfish-app-6ki8h.ondigitalocean.app/wildplants", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json());
}

export const getSinglePlant = (plantId) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/wildplants/${plantId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json());
}

export const postNewPlant = (newPlant) => {
    return fetch("https://goldfish-app-6ki8h.ondigitalocean.app/wildplants", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        },
        body: JSON.stringify(newPlant)
    }).then(res => res.json())
}

export const deleteWildPlant = (plantId) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/wildplants/${plantId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    })
  }

export const updatePlant = (plantId, plant) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/wildplants/${plantId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        },
        body: JSON.stringify(plant)
    })
}


export const getPlantsByEdiblePart = (partId) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/wildplants?edible_part=${partId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json());
}

export const getPlantsByCommonName = (searchTerm) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/wildplants?common_name=${searchTerm}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const getPlantsByNameAndPart = (searchTerm, partId) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/wildplants?common_name=${searchTerm}&edible_part=${partId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}
