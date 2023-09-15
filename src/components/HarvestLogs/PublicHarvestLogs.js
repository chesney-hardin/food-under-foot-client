

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPublicHarvestLogsByPlantId } from "../../managers/HarvestLogsManager";
import { MapView } from "./MapView";

export const PublicHarvestLogs = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [harvestLogs, setHarvestLogs] = useState([]);

  useEffect(() => {
    if (plantId) {
      getPublicHarvestLogsByPlantId(plantId).then((harvestData) =>
        setHarvestLogs(harvestData)
      );
    }
  }, []);

  return (
    <>
      <div className="bg-gray-100 p-4">
        <h2 className="text-2xl font-semibold mb-4">Public Harvest Logs</h2>
        <MapView harvestLogs={harvestLogs} />
      </div>
      <button
        className="btn btn-1 btn-sep icon-send mt-4"
        onClick={() => {
          navigate(`/edible-profile/${plantId}`);
        }}
      >
        Back to Plant Profile
      </button>
      <article className="p-4">
        {harvestLogs.map((harvestLog) => (
          <section
            key={`harvestLog--${harvestLog.id}`}
            className="border border-gray-300 rounded-md p-4 mb-4"
          >
            <h3 className="text-xl font-semibold mb-2">{harvestLog.title}</h3>
            <img
              src={harvestLog.image}
              alt="image of harvest"
              className="max-w-full mb-2"
            />
            <div>
              Harvested: {harvestLog.wild_plant.common_name}{" "}
              {harvestLog.plant_part.label}
            </div>
            <div>
              Posted by: {harvestLog.user.first_name}{" "}
              {harvestLog.user.last_name}
            </div>
            <div>
              Coordinates: {harvestLog.latitude}, {harvestLog.longitude}
            </div>
            <div>
              {harvestLog.isPublicLocation
                ? "This is a public location"
                : "This is a private location"}
            </div>
            <div>Quantity: {harvestLog.quantity}</div>
            <div>Description: {harvestLog.description}</div>
          </section>
        ))}
      </article>
    </>
  );
};
