import { useEffect, useState } from "react"
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
