export const getApprovedTipsByPlantId = (plantId) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/tipsandrecipes?approved&tips&plant=${plantId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const getApprovedRecipesByPlantId = (plantId) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/tipsandrecipes?approved&recipes&plant=${plantId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const postNewTipOrRecipe = (body) => {
    return fetch("https://goldfish-app-6ki8h.ondigitalocean.app/tipsandrecipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
}

export const getCurrentUsersRecipes = () => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/tipsandrecipes?recipes&user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const getCurrentUsersTips = () => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/tipsandrecipes?tips&user`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const getTipsOrRecipesById = (id) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/tipsandrecipes/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const updateTipOrRecipe = (id, body) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/tipsandrecipes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        },
        body: JSON.stringify(body)
    })
}

export const deleteTipOrRecipe  = (id) => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/tipsandrecipes/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    })
  }

  export const getUnapprovedRecipesForReview = () => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/tipsandrecipes?unapproved&recipes&review`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}

export const getUnapprovedTipsForReview = () => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/tipsandrecipes?unapproved&tips&review`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}
export const getUnapprovedRecipesAndTipsForReview = () => {
    return fetch(`https://goldfish-app-6ki8h.ondigitalocean.app/tipsandrecipes?unapproved&review`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}
