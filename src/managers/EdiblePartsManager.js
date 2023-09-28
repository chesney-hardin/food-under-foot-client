export const getCurrentEdibles = () => {
    return fetch("http://localhost:8000/edibleparts?current", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json());
}

export const getEdiblePartsOfAPlant = (plantId) => {
    return fetch(`http://localhost:8000/edibleparts?plant=${plantId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json());
}

export const getEdibleParts = () => {
    return fetch(`http://localhost:8000/edibleparts`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const deleteEdiblePart = (edibleId) => {
    return fetch(`http://localhost:8000/edibleparts/${edibleId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    })
}

export const getEdiblePartById = (edibleId) => {
    return fetch(`http://localhost:8000/edibleparts/${edibleId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const updatePart = (partId, part) => {
    return fetch(`http://localhost:8000/edibleparts/${partId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        },
        body: JSON.stringify(part)
    })
}

// use to convert month integer into string
export const convertHarvestMonth = (monthData) => {
    const monthNumber = parseInt(monthData, 10)
    const date = new Date(`2023-${monthNumber}-01`)
    const monthName = date.toLocaleString("default", { month: "long" })
    return monthName
}