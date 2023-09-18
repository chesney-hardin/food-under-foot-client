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

export const postNewTip = (newTip) => {
    return fetch("http://localhost:8000/tipsandrecipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        },
        body: JSON.stringify(newTip)
    }).then(res => res.json())
}

export const getCurrentUsersRecipes = () => {
    return fetch(`http://localhost:8000/tipsandrecipes?recipes&user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const getCurrentUsersTips = () => {
    return fetch(`http://localhost:8000/tipsandrecipes?tips&user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const getTipsOrRecipesById = (id) => {
    return fetch(`http://localhost:8000/tipsandrecipes/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const updateTipOrRecipe = (id, body) => {
    return fetch(`http://localhost:8000/tipsandrecipes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        },
        body: JSON.stringify(body)
    })
}

export const deleteTipOrRecipe  = (id) => {
    return fetch(`http://localhost:8000/tipsandrecipes/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    })
  }
