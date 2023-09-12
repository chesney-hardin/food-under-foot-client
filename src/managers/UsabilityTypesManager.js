export const getUsabilityTypes = () => {
    return fetch("http://localhost:8000/usabilitytypes", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("fuf_token")}`
        }
    }).then(res => res.json())
}
