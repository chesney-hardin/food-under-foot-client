import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCurrentUsersHarvestLogs, getUsersSearchHarvestLogs } from "../../managers/HarvestLogsManager"
import { MapView } from "./MapView"
import { HarvestLogList } from "./HarvestLogList"
import { HarvestLogSearch } from "./HarvestLogSearch"

export const UserHarvestLogs = () => {
  const navigate = useNavigate()
  const [harvestLogs, setHarvestLogs] = useState([])
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(true)
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
          className="px-4 py-2 m-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
          onClick={getAllLogs}>
          Show All
        </button>
        <button
          className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
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
  );
};
