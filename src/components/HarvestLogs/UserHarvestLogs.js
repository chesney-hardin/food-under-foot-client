import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUsersHarvestLogs, getUsersSearchHarvestLogs } from "../../managers/HarvestLogsManager"
import { MapView } from "./MapView"
import { HarvestLogList } from "./HarvestLogList"
import { HarvestLogSearch } from "./HarvestLogSearch"

export const UserHarvestLogs = () => {
  const navigate = useNavigate()
  const [harvestLogs, setHarvestLogs] = useState([])
  const showEditDeleteButtons = true
  const [searchTerms, setSearchTerms] = useState("")

  useEffect(() => {
    getAllLogs()
  }, [])

  useEffect(() => {
    getUsersSearchHarvestLogs(searchTerms).then((searchedLogs) => {
      setHarvestLogs(searchedLogs)
    })
  }, [searchTerms])

  const getAllLogs = () => {
    getCurrentUsersHarvestLogs().then((usersLogs) => {
      setHarvestLogs(usersLogs)
    }) 
  }


  return (
    <>
      <div className="bg-gray-100 p-2 pb-1 px-16">
        <h1 className="text-2xl font-semibold mb-4">Your Harvest Logs</h1>
        <MapView harvestLogs={harvestLogs} />
      </div>
      <article className="p-2 pb-1 px-8">
        <HarvestLogSearch setSearchTerms={setSearchTerms} />
        <button
          className="m-2 btn"
          onClick={getAllLogs}>
          Show All
        </button>
        <button
          className="btn"
          onClick={() => {
            navigate(`/harvest-log-form`)
          }}
        >
          Log a Harvest
        </button>
      </article>
      <article className="p-2 pb-1 px-8">
        <HarvestLogList 
          harvestLogs={harvestLogs}
          setHarvestLogs={setHarvestLogs}
          showEditDeleteButtons={showEditDeleteButtons} />
      </article>
    </>
  )
}
