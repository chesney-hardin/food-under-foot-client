/* import { useEffect, useState } from "react"
import { deleteWildPlant, getWildPlants } from "../../managers/WildPlantsManager"
import { useNavigate } from "react-router-dom"

export const ManageWildPlants = () => {
    const [edibles, setEdibles] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getWildPlants().then((plantData) => setEdibles(plantData))
    }, [])

    const deletePlantProfile = (plantId) => {

        const userConfirmed = window.confirm("Are you sure you want to PERMANENTLY DELETE this plant profile from the database? This cannot be undone.");
        if (userConfirmed) {
            deleteWildPlant(plantId)
                .then(() => {
                    getWildPlants().then((plantData) => setEdibles(plantData))
                })
        }
    }

    return <article>
        <button className="btn btn-1 btn-sep icon-send"
            onClick={() => { navigate(`/new-plant-form`) }}
        >Add a New Wild Plant</button>
        {edibles.map((plant) => (
            <section
                key={`plant--${plant.id}`}
                style={{ border: '1px solid #000', padding: '10px' }}>
                <article
                    onClick={() => { navigate(`/manage-edible-profile/${plant?.id}`) }}>
                    <img src={plant?.image} alt="image of edible plant" style={{ maxHeight: '300px' }} />
                    <div>{plant?.common_name.toUpperCase()}</div>
                    <div> {plant?.plant_part?.label} </div>
                </article>
                <button className="btn btn-1 btn-sep icon-send"
                    onClick={() => { navigate(`/edit-edible-profile/${plant.id}`) }}
                >Edit</button>
                <button className="btn btn-1 btn-sep icon-send"
                    onClick={() => { deletePlantProfile(plant.id) }}
                >Delete</button>
            </section>
        ))}
    </article>
} */
import { useEffect, useState } from "react";
import { deleteWildPlant, getWildPlants } from "../../managers/WildPlantsManager";
import { useNavigate } from "react-router-dom";

export const ManageWildPlants = () => {
    const [edibles, setEdibles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getWildPlants().then((plantData) => setEdibles(plantData));
    }, []);

    const deletePlantProfile = (plantId) => {
        const userConfirmed = window.confirm(
            "Are you sure you want to PERMANENTLY DELETE this plant profile from the database? This cannot be undone."
        );
        if (userConfirmed) {
            deleteWildPlant(plantId).then(() => {
                getWildPlants().then((plantData) => setEdibles(plantData));
            });
        }
    };

    return (
        <article className="bg-white p-4 rounded-lg shadow-lg">
            <button
                onClick={() => {
                    navigate(`/new-plant-form`);
                }}
                className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
            >
                Add a New Wild Plant
            </button>
            {edibles.map((plant) => (
                <section
                    key={`plant--${plant.id}`}
                    className="bg-white p-4 rounded-lg shadow-md mt-4 flex items-center"
                >
                    <article
                        onClick={() => {
                            navigate(`/manage-edible-profile/${plant?.id}`);
                        }}
                        className="cursor-pointer w-1/2"
                    >
                        <img
                            src={plant?.image}
                            alt="image of edible plant"
                            className="max-h-64 w-full rounded-lg shadow-lg"
                            style={{ objectFit: "cover" }}
                        />
                    </article>
                    <div className="w-1/2 px-4">
                        <div className="text-2xl font-semibold text-fuf-green">
                            {plant?.common_name.toUpperCase()}
                        </div>
                        <div className="text-gray-600">
                            {plant?.plant_part?.label}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => {
                                    navigate(`/edit-edible-profile/${plant.id}`);
                                }}
                                className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50 mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    deletePlantProfile(plant.id);
                                }}
                                className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </section>
            ))}
        </article>
    );
};
