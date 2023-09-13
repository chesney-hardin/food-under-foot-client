import { useEffect, useState } from "react"
import { getCurrentEdibles } from "../../managers/EdiblePartsManager"
import { useNavigate } from "react-router-dom"

export const AdminHome = () => {
    const [edibles, setEdibles] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCurrentEdibles   ().then((plantData) => setEdibles(plantData))
    }, [])

    return <>
        <h1>Check out what's ripe this month!!</h1>
        <article>
            {edibles.map((plant) => (
                <section
                    key={`plant--${plant.id}`}
                    style={{
                        border: '1px solid #000',
                        padding: '10px',
                    }} onClick={() => { navigate(`/manage-edible-profile/${plant?.wild_plant?.id}`) }}>
                    <img src={plant?.wild_plant?.image} alt="image of edible plant" style={{ maxWidth: '300px' }} />
                    <div>{plant?.wild_plant?.common_name.toUpperCase()}</div>
                    <div> {plant?.plant_part?.label} </div>
                </section>
            ))}
        </article>
    </>
}