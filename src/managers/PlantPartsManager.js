export const getPlantParts = () => {
    return fetch(`http://localhost:8000/plantparts`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}


export const postNewEdiblePart = (newEdiblePart) => {
    return fetch("http://localhost:8000/edibleparts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        },
        body: JSON.stringify(newEdiblePart)
    }).then(res => res.json())
}