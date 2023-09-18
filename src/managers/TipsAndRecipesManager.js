export const getApprovedTipsByPlantId = (plantId) => {
    return fetch(`http://localhost:8000/tipsandrecipes?approved&tips&plant=${plantId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const getApprovedRecipesByPlantId = (plantId) => {
    return fetch(`http://localhost:8000/tipsandrecipes?approved&recipes&plant=${plantId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}