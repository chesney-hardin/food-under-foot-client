export const getWildPlants = () => {
    return fetch("http://localhost:8000/wildplants", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json());
}

export const getSinglePlant = (plantId) => {
    return fetch(`http://localhost:8000/wildplants/${plantId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json());
}



export const postNewPlant = (newPlant) => {
    return fetch("http://localhost:8000/wildplants", {
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
    return fetch(`http://localhost:8000/wildplants/${plantId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    })
  }