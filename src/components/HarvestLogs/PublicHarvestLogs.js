import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPublicHarvestLogsByPlantId, getPublicHarvestLogsByTitle } from "../../managers/HarvestLogsManager";
import { MapView } from "./MapView";
import { HarvestLogList } from "./HarvestLogList";
import { HarvestLogSearch } from "./HarvestLogSearch";

export const PublicHarvestLogs = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [harvestLogs, setHarvestLogs] = useState([])
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false)
  const [searchTerms, setSearchTerms] = useState("")

  useEffect(() => {
    if (plantId) {
      getAllLogs()
    }
  }, [])


  useEffect(() => {
    getPublicHarvestLogsByTitle(plantId, searchTerms).then((searchedLogs) => {
      setHarvestLogs(searchedLogs)
    })
  }, [searchTerms])

  const getAllLogs = () => {
    getPublicHarvestLogsByPlantId(plantId).then((harvestData) =>
      setHarvestLogs(harvestData)
    )
  }

  return (
    <>
      <div className="bg-gray-100 p-4">
        <h2 className="text-2xl font-semibold mb-4">Public Harvest Logs</h2>
        <button
          className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
          onClick={() => {
            navigate(`/edible-profile/${plantId}`);
          }}
        >
          Back to Plant Profile
        </button>
        <MapView harvestLogs={harvestLogs} />
      </div>
      <article className="p-2 pb-1">
        <HarvestLogSearch setSearchTerms={setSearchTerms} />
        <button
          className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
          onClick={getAllLogs}>
          Show All
        </button>
      </article>

      <article className="p-4">
        <HarvestLogList harvestLogs={harvestLogs} setHarvestLogs={setHarvestLogs} showEditDeleteButtons={showEditDeleteButtons} />
      </article>
    </>
  );
};
