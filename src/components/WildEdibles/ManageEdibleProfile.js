/* import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteWildPlant, getSinglePlant } from "../../managers/WildPlantsManager"
import { deleteEdiblePart, getEdiblePartsOfAPlant } from "../../managers/EdiblePartsManager"
import { AdminNewEdiblePart } from "./AdminNewEdiblePart"

export const ManageEdibleProfile = () => {
    const { plantId } = useParams()
    const navigate = useNavigate()
    const [showEdiblePartForm, setShowEdiblePartForm] = useState(false)
    const [plant, setPlant] = useState({
        id: 0,
        common_name: "",
        latin_name: "",
        alternate_names: "",
        latin_family: "",
        description: "",
        image: "",
        link_to_usda: "",
        created_by: 0,
        edible_parts: []
    })
    const [edibleParts, setEdibleParts] = useState([])

    useEffect(() => {
        getSinglePlant(plantId).then((plantData) => setPlant(plantData))
        getEdiblePartsOfAPlant(plantId).then((plantData) => setEdibleParts(plantData))
    }, [])

    const convertHarvestMonth = (monthData) => {
        const monthNumber = parseInt(monthData, 10)
        const date = new Date(`2023-${monthNumber}-01`)
        const monthName = date.toLocaleString('default', { month: 'long' })
        return monthName
    }

    const deletePlantProfile = (event) => {
        event.preventDefault()

        const userConfirmed = window.confirm("Are you sure you want to PERMANENTLY DELETE this plant profile from the database? This cannot be undone.");
        if (userConfirmed) {
            deleteWildPlant(plantId)
                .then(() => {
                    navigate(`/manage-edibles`)
                })
        }
    }
    const deletePart = (partId) => {

        deleteEdiblePart(partId)
            .then(() => {
                getEdiblePartsOfAPlant(plantId).then((plantData) => setEdibleParts(plantData))
            })
    }

    return <>
        <section style={{ border: '1px solid #000', padding: '10px' }}>
            <img src={plant.image} alt="image of edible plant" style={{ maxHeight: '300px' }} />
            <button className="btn btn-1 btn-sep icon-send"
                onClick={() => {navigate(`/harvest-logs/${plantId}`)}}
            >Public Harvest Logs</button>
            <button className="btn btn-1 btn-sep icon-send"
                onClick={() => { navigate(`/edit-edible-profile/${plantId}`) }}
            >Edit Plant Profile</button>
            <button className="btn btn-1 btn-sep icon-send"
                onClick={deletePlantProfile}
            >Delete Plant Profile</button>
            <div>{plant.common_name.toUpperCase()} ({plant.latin_name})</div>
            <div>Latin family: {plant.latin_family}</div>
            <div>Other common names: {plant.alternate_names}</div>
            <div>Description: {plant.description}</div>
            <Link className="nav-link" to={plant.link_to_usda} target="_blank" rel="noopener noreferrer">USDA Plant Profile for More Information</Link>
        </section>
        <div>==============================================================</div>
        <section>
            <div>Edible Parts: {edibleParts.map((part) =>
                <article 
                key={`part--${part.id}`}
                style={{ border: '1px solid #000', padding: '10px' }}>
                    <img src={part.image} alt="image of edible part" style={{ maxHeight: '100px' }} />
                    <div>{part.plant_part.label}</div>
                    <div>Harvest Season: {convertHarvestMonth(part.harvest_start)} - {convertHarvestMonth(part.harvest_end)}</div>
                    <img src={part.usability.icon} style={{ maxHeight: '50px' }} />
                    <button className="btn btn-1 btn-sep icon-send"
                        onClick={() => { navigate(`/edit-edible-part/${part.id}`) }}
                    >Edit Edible Part</button>
                        <button className="btn btn-1 btn-sep icon-send"
                            onClick={() => { deletePart(part.id) }}
                        >Delete Edible Part</button> 
                </article>
            )}</div>
            {showEdiblePartForm ?
                <AdminNewEdiblePart plant={plant} setShowEdiblePartForm={setShowEdiblePartForm} setEdibleParts={setEdibleParts} />
                : <button className="btn btn-1 btn-sep icon-send"
                    onClick={() => { setShowEdiblePartForm(true) }}
                >Add An Edible Part</button>}
        </section>
    </>
} */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteWildPlant, getSinglePlant } from "../../managers/WildPlantsManager";
import { deleteEdiblePart, getEdiblePartsOfAPlant } from "../../managers/EdiblePartsManager";
import { AdminNewEdiblePart } from "./AdminNewEdiblePart";

export const ManageEdibleProfile = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [showEdiblePartForm, setShowEdiblePartForm] = useState(false);
  const [plant, setPlant] = useState({
    id: 0,
    common_name: "",
    latin_name: "",
    alternate_names: "",
    latin_family: "",
    description: "",
    image: "",
    link_to_usda: "",
    created_by: 0,
    edible_parts: [],
  });
  const [edibleParts, setEdibleParts] = useState([]);

  useEffect(() => {
    getSinglePlant(plantId).then((plantData) => setPlant(plantData));
    getEdiblePartsOfAPlant(plantId).then((plantData) => setEdibleParts(plantData));
  }, []);

  const convertHarvestMonth = (monthData) => {
    const monthNumber = parseInt(monthData, 10);
    const date = new Date(`2023-${monthNumber}-01`);
    const monthName = date.toLocaleString("default", { month: "long" });
    return monthName;
  };

  const deletePlantProfile = (event) => {
    event.preventDefault();

    const userConfirmed = window.confirm(
      "Are you sure you want to PERMANENTLY DELETE this plant profile from the database? This cannot be undone."
    );
    if (userConfirmed) {
      deleteWildPlant(plantId).then(() => {
        navigate(`/manage-edibles`);
      });
    }
  };
  const deletePart = (partId) => {
    deleteEdiblePart(partId).then(() => {
      getEdiblePartsOfAPlant(plantId).then((plantData) => setEdibleParts(plantData));
    });
  };

  return (
    <section className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between">
        <div className="w-2/3 pr-4">
          <h1 className="text-2xl font-semibold">
            {plant.common_name.toUpperCase()} ({plant.latin_name})
          </h1>
          <button className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              onClick={() => { navigate(`/edit-edible-profile/${plantId}`) }}
            >Edit Profile</button>
            <button className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              onClick={deletePlantProfile}
            >Delete Profile</button>
          <p className="text-gray-600">{plant.latin_family}</p>
          <p className="text-gray-600">Other common names: {plant.alternate_names}</p>
          <p className="mt-2">{plant.description}</p>
          <a
            className="text-fuf-green hover:underline mt-2 inline-block"
            href={plant.link_to_usda}
            target="_blank"
            rel="noopener noreferrer"
          >
            USDA {plant.common_name} Profile
          </a>
          <div className="space-y-4 mt-4">
            <button
              onClick={() => {
                navigate(`/public-harvest-logs/${plantId}`);
              }}
              className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
            >
              Public Harvest Logs
            </button>

          </div>
        </div>
        <div className="w-4/6">
          <img
            src={plant.image}
            alt="image of edible plant"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {edibleParts.map((part) => (
          <article key={`part--${part.id}`} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">{part.plant_part.label}</h2>
              <img src={part.usability.icon} alt="usability icon" className="max-h-8 rounded-lg shadow-lg" />
            </div>
            <div className="text-gray-600">
              {convertHarvestMonth(part.harvest_start)} - {convertHarvestMonth(part.harvest_end)}
            </div>
            <img src={part.image} alt="image of edible part" className="max-h-24 mx-auto rounded-lg shadow-lg" />
            <button className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              onClick={() => { navigate(`/edit-edible-part/${part.id}`) }}
            >Edit Part</button>
            <button className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              onClick={() => { deletePart(part.id) }}
            >Delete Part</button>
          </article>
        ))}
        {showEdiblePartForm ?
                <AdminNewEdiblePart plant={plant} setShowEdiblePartForm={setShowEdiblePartForm} setEdibleParts={setEdibleParts} />
                : <button className="w-56 px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                    onClick={() => { setShowEdiblePartForm(true) }}
                >+ Add An Edible Part</button>}
      </div>
    </section>
  );
};
