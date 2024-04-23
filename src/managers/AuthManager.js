export const loginUser = (user) => {
    return fetch("https://goldfish-app-6ki8h.ondigitalocean.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
  }
  
  export const registerUser = (user) => {
    return fetch("https://goldfish-app-6ki8h.ondigitalocean.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
  }
  