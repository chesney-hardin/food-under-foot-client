import { useEffect, useState } from "react"
import { getCurrentEdibles } from "../../managers/EdiblePartsManager"
import { useNavigate } from "react-router-dom"
import { getUsabilityTypes } from "../../managers/UsabilityTypesManager"

export const CurrentEdiblesList = () => {
    const [edibles, setEdibles] = useState([])
    const [usabilityTypes, setUsabilityTypes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCurrentEdibles().then((plantData) => setEdibles(plantData))
        getUsabilityTypes().then((types) => setUsabilityTypes(types))
    }, [])

    return (
        <div>
            <div className="flex justify-center items-center m-8">
                {usabilityTypes.map((type) => (
                    <div
                        key={`type--${type.id}`}
                        className="flex">
                        <img src={type?.icon} alt="image of use type" className="max-h-12 ml-6 mr-3 rounded-lg shadow-lg" />  =  {type?.label}
                    </div>
                ))}
            </div>
            <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {edibles.map((plant) => (
                    <section
                        key={`plant--${plant.id}`}
                        className="bg-white p-4 rounded-lg shadow-md mt-4 my-2 cursor-pointer"
                        onClick={() => { navigate(`/edible-profile/${plant?.wild_plant?.id}`) }}
                    >
                        <img src={plant?.wild_plant?.image} alt="image of edible plant" className="w-full h-40 object-cover" />
                        <div className="text-xl font-bold mt-2 mb-1">{plant?.wild_plant?.common_name.toUpperCase()}</div>
                        <div className="flex">
                            <div className="text-lg">{plant?.plant_part?.label}</div>
                            <img src={plant?.usability?.icon} alt="image of use type" className="max-h-12 ml-6 rounded-lg shadow-lg" />
                        </div>
                    </section>
                ))}
            </article>
        </div>
    )
}

