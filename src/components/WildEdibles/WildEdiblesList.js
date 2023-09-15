/* import { useEffect, useState } from "react"
import { getWildPlants } from "../../managers/WildPlantsManager"
import { useNavigate } from "react-router-dom"

export const WildEdiblesList = () => {
    const [edibles, setEdibles] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getWildPlants().then((plantData) => setEdibles(plantData))
    }, [])

    return <article>
        {edibles.map((plant) => (
            <section 
            key={`plant--${plant.id}`}
            style={{ border: '1px solid #000', padding: '10px' }}
            onClick={() => { navigate(`/edible-profile/${plant?.id}`) }}>
                <img src={plant?.image} alt="image of edible plant" style={{ maxHeight: '300px' }} />
                <div>{plant?.common_name.toUpperCase()}</div>
                <div> {plant?.plant_part?.label} </div>
            </section>
        ))}
    </article>
}
 */
import { useEffect, useState } from "react";
import { getWildPlants } from "../../managers/WildPlantsManager";
import { useNavigate } from "react-router-dom";

export const WildEdiblesList = () => {
    const [edibles, setEdibles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getWildPlants().then((plantData) => setEdibles(plantData));
    }, []);

    return (
        <article className="bg-white p-4 rounded-lg shadow-lg">
            <div className="mx-auto sm:w-2/3">
            {edibles.map((plant) => (
                <section
                    key={`plant--${plant.id}`}
                    className="bg-white p-4 rounded-lg shadow-md mt-4 my-2 cursor-pointer"
                    onClick={() => {
                        navigate(`/edible-profile/${plant?.id}`);
                    }}
                >
                    <img
                        src={plant?.image}
                        alt="image of edible plant"
                        className="max-h-64 w-full rounded-lg shadow-lg"
                        style={{ objectFit: "cover" }}
                    />
                    <div className="text-2xl font-semibold text-fuf-green">
                        {plant?.common_name.toUpperCase()}
                    </div>
                    <div className="text-gray-600">
                        {plant?.plant_part?.label}
                    </div>
                </section>
            ))}
            </div>
        </article>
    );
};
