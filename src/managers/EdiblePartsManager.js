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
        headers:{
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    })
  }