import { useEffect, useState } from "react";
import { deleteWildPlant, getPlantsByCommonName, getPlantsByEdiblePart, getPlantsByNameAndPart, getWildPlants } from "../../managers/WildPlantsManager";
import { useNavigate } from "react-router-dom";
import { WildEdiblesSearch } from "./WildEdiblesSearch";

export const ManageWildPlants = () => {
    const [edibles, setEdibles] = useState([])
    const [searchState, setSearchState] = useState({
        name: "",
        partId: 0
    })
    const navigate = useNavigate()

    useEffect(() => {
        getWildPlants().then((plantData) => setEdibles(plantData))
    }, [])

    useEffect(() => {
        if (searchState.name && !searchState.partId) {
            getPlantsByCommonName(searchState.name).then((plantData) => setEdibles(plantData))
        }
        else if (!searchState.name && searchState.partId) {
            getPlantsByEdiblePart(searchState.partId).then((plantData) => setEdibles(plantData))
        }
        else if (searchState.name && searchState.partId) {
            getPlantsByNameAndPart(searchState.name, searchState.partId).then((plantData) => setEdibles(plantData))
        }

    }, [searchState])

    const showAllEdibles = () => {
        getWildPlants().then((plantData) => setEdibles(plantData))
        setSearchState({
            name: "",
            partId: 0
        })
    }


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
        <div className="flex justify-around">
            <div className="w-1/3">
                <article className="bg-white fixed rounded-lg shadow-lg px-6 py-4">
                    <h1 className="text-2xl font-semibold mb-3">
                        Manage Wild Edibles
                    </h1>
                    <div>
                        <button
                            onClick={() => {
                                navigate(`/new-plant-form`);
                            }}
                            className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                        >
                            Add a New Wild Plant
                        </button>
                    </div>
                    <hr className="my-4" />
                    <WildEdiblesSearch setSearchState={setSearchState} />
                    <button
                        className="px-4 py-2 ml-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50 mt-4"
                        onClick={showAllEdibles}
                    >
                        Show All
                    </button>

                </article>
            </div>

            <div className="w-2/3">
                <div className="mx-auto">
                    {edibles.map((plant) => (
                        <section
                            key={`plant--${plant.id}`}
                            className="bg-white p-4 rounded-lg shadow-md mt-4 my-2 cursor-pointer"
                        >
                            <article
                                onClick={() => {
                                    navigate(`/manage-edible-profile/${plant?.id}`);
                                }}
                                className="cursor-pointer w-full"
                            >
                                <img
                                    src={plant?.image}
                                    alt="image of edible plant"
                                    className="max-h-48 w-full rounded-lg shadow-lg"
                                    style={{ objectFit: "cover" }}
                                />
                            
                                <div className="text-2xl font-semibold text-fuf-green">
                                    {plant?.common_name.toUpperCase()}
                                </div>
                                <div className="text-gray-600">
                                    {plant?.plant_part?.label}
                                </div>
                                </article>
                            
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
                            
                        </section>
                    ))}
                </div>
            </div>
        </div>
    )
}
