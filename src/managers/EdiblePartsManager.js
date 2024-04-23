export const getCurrentEdibles = () => {
    return fetch("https://goldfish-app-6ki8h.ondigitalocean.app/edibleparts?current", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json());
}

export const getEdiblePartsOfAPlant = (plantId) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/edibleparts?plant=${plantId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json());
}

export const getEdibleParts = () => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/edibleparts`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const deleteEdiblePart = (edibleId) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/edibleparts/${edibleId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    })
}

export const getEdiblePartById = (edibleId) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/edibleparts/${edibleId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const updatePart = (partId, part) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/edibleparts/${partId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        },
        body: JSON.stringify(part)
    })
}
