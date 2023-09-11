export const getWildPlants = () => {
    return fetch("http://localhost:8000/wildplants", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json());
};

/* export const postCategories = (newCategory) => {
    return fetch("http://localhost:8000/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(newCategory)
    }).then(res => res.json());
}; */