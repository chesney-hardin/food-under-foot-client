
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteHarvestLog, getCurrentUsersHarvestLogs } from "../../managers/HarvestLogsManager";
import { MapView } from "./MapView";

export const UserHarvestLogs = () => {
  const navigate = useNavigate();
  const [harvestLogs, setHarvestLogs] = useState([]);

  useEffect(() => {
    getCurrentUsersHarvestLogs().then((usersLogs) => {
      setHarvestLogs(usersLogs);
    });
  }, []);

  const deleteLog = (logId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to PERMANENTLY DELETE this harvest log? This cannot be undone."
    );
    if (userConfirmed) {
      deleteHarvestLog(logId).then(() => {
        getCurrentUsersHarvestLogs().then((usersLogs) => {
          setHarvestLogs(usersLogs);
        });
      });
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-4">
        <h1 className="text-2xl font-semibold mb-4">Your Harvest Logs</h1>
        <MapView harvestLogs={harvestLogs} />
      </div>
      <button
        className="btn btn-1 btn-sep icon-send mt-4"
        onClick={() => {
          navigate(`/harvest-log-form`);
        }}
      >
        Log a Harvest
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
              Harvested:{" "}
              <Link to={`/edible-profile/${harvestLog.wild_plant.id}`}>
                {harvestLog.wild_plant.common_name}
              </Link>{" "}
              {harvestLog.plant_part.label}
            </div>
            <div>Date of Harvest: {harvestLog.date}</div>
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
            <button
              className="btn btn-1 btn-sep icon-send mt-2"
              onClick={() => {
                navigate(`/edit-harvest-log/${harvestLog.id}`);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-1 btn-sep icon-send mt-2"
              onClick={() => {
                deleteLog(harvestLog.id);
              }}
            >
              Delete
            </button>
          </section>
        ))}
      </article>
    </>
  );
};
