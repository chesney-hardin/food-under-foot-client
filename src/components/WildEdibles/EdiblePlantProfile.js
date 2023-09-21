import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePlant } from "../../managers/WildPlantsManager";
import { getEdiblePartsOfAPlant } from "../../managers/EdiblePartsManager";
import { TipsAndRecipesList } from "../TipsAndRecipes/TipsAndRecipesList";

export const EdiblePlantProfile = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
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
  })
  const [edibleParts, setEdibleParts] = useState([])

  useEffect(() => {
    getSinglePlant(plantId).then((plantData) => setPlant(plantData));
    getEdiblePartsOfAPlant(plantId).then((plantData) => setEdibleParts(plantData));
  }, []);

  const convertHarvestMonth = (monthData) => {
    const monthNumber = parseInt(monthData, 10);
    const date = new Date(`2023-${monthNumber}-01`)
    const monthName = date.toLocaleString("default", { month: "long" })
    return monthName
  };

  return (
    <section className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex">
        <div className="w-1/4 pr-1 rounded-lg shadow-lg">
          <div className="grid pr-1">
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
              </article>
            ))}
          </div>
        </div>

        <div className="w-3/4 flex justify-between">
          <div className="w-2/3 ml-8">
            <h1 className="text-2xl font-semibold">
              {plant.common_name.toUpperCase()} ({plant.latin_name})
            </h1>
            <p className="text-gray-600">{plant.latin_family}</p>
            <p className="text-gray-600">Other common names: {plant.alternate_names}</p>
            <p className="mt-2">{plant.description}</p>
            <a
              className="text-fuf-green hover:underline mt-2 inline-block"
              href={plant.link_to_usda}
              target="_blank"
              rel="noopener noreferrer"
            >
              More Information
            </a>

          </div>
          <div className="w-1/3 ml-4">
            <img
              src={plant.image}
              alt="image of edible plant"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="space-y-4 mt-4">
            <button
                onClick={() => {
                  navigate(`/public-harvest-logs/${plantId}`);
                }}
                className="px-2 py-1 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              >
                Public Harvest Logs
              </button>
              <button
                onClick={() => {
                  navigate(`/harvest-log-form/${plantId}`);
                }}
                className="px-2 py-1 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
              >
                Log a Harvest
              </button>
          
            </div>
          </div>
        </div>
      </div>

      <hr className="my-8" />

      <article>
        <TipsAndRecipesList plantId={plantId} />
      </article>
    </section>

  )
}
