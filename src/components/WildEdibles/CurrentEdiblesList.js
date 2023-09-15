/* import { useEffect, useState } from "react"
import { getCurrentEdibles } from "../../managers/EdiblePartsManager"
import { useNavigate } from "react-router-dom"

export const CurrentEdiblesList = () => {
    const [edibles, setEdibles] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCurrentEdibles().then((plantData) => setEdibles(plantData))
    }, [])

    return <article>
        {edibles.map((plant) => (
            <section 
            key={`plant--${plant.id}`}
            style={{
                border: '1px solid #000',
                padding: '10px',         
              }}onClick={() => { navigate(`/edible-profile/${plant?.wild_plant?.id}`) }}>
                <img src={plant?.wild_plant?.image} alt="image of edible plant"style={{maxWidth: '300px'}}/>
                <div>{plant?.wild_plant?.common_name.toUpperCase()}</div>
                <div> {plant?.plant_part?.label} </div>
            </section>
        ))}
    </article>
} */

import { useEffect, useState } from "react"
import { getCurrentEdibles } from "../../managers/EdiblePartsManager"
import { useNavigate } from "react-router-dom"

export const CurrentEdiblesList = () => {
    const [edibles, setEdibles] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCurrentEdibles().then((plantData) => setEdibles(plantData))
    }, [])

    return <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {edibles.map((plant) => (
            <section 
                key={`plant--${plant.id}`}
                className="border-2 border-black p-4 rounded overflow-hidden hover:scale-105 cursor-pointer"
                onClick={() => { navigate(`/edible-profile/${plant?.wild_plant?.id}`) }}
            >
                <img src={plant?.wild_plant?.image} alt="image of edible plant" className="w-full h-40 object-cover" />
                <div className="text-xl font-bold mt-2 mb-1">{plant?.wild_plant?.common_name.toUpperCase()}</div>
                <div className="text-lg">{plant?.plant_part?.label}</div>
            </section>
        ))}
    </article>
}

