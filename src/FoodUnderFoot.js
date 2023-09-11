import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"

export const FoodUnderFoot = () => {
  const [token, setTokenState] = useState(localStorage.getItem('fuf_token'))
  const [staff, setStaffState] = useState(localStorage.getItem('staff'))

  const setToken = (newToken) => {
    localStorage.setItem('fuf_token', newToken)
    setTokenState(newToken)
  }
  const setStaff = (newStaff) => {
    localStorage.setItem('staff', newStaff)
    setStaffState(JSON.parse(newStaff))
  }

  return <>
    <NavBar token={token} setToken={setToken} staff={staff} setStaff={setStaff}/>
    <ApplicationViews token={token} setToken={setToken} staff={staff} setStaff={setStaff} />
  </>
}

