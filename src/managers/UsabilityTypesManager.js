export const getUsabilityTypes = () => {
    return fetch("https://goldfish-app-6ki8h.ondigitalocean.app/usabilitytypes", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}
