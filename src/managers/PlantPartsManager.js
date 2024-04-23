export const getPlantParts = () => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/plantparts`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}


export const postNewEdiblePart = (newEdiblePart) => {
    return fetch("https://goldfish-app-6ki8h.ondigitalocean.app/edibleparts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        },
        body: JSON.stringify(newEdiblePart)
    }).then(res => res.json())
}