import { useEffect, useState } from "react"
import { getCurrentEdibles, getWildPlants } from "../../managers/WildPlantsManager"
import { useNavigate } from "react-router-dom"

export const ManageWildPlants = () => {
    const [edibles, setEdibles] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getWildPlants().then((plantData) => setEdibles(plantData))
    }, [])


    return <article>
         <button className="btn btn-1 btn-sep icon-send"
                    onClick={() => { navigate(`/new-plant-form`) }}
                >Add a New Wild Plant</button>
        {edibles.map((plant) => (
            <section style={{ border: '1px solid #000', padding: '10px' }}
                onClick={() => { navigate(`/manage-edible-profile/${plant?.id}`) }}>
                <img src={plant?.image} alt="image of edible plant" style={{ maxHeight: '300px' }} />
                <div>{plant?.common_name.toUpperCase()}</div>
                <div> {plant?.plant_part?.label} </div>
                <button className="btn btn-1 btn-sep icon-send"
                    onClick={() => { navigate(``) }}
                >Edit</button>
                <button className="btn btn-1 btn-sep icon-send"
                    onClick={() => { /* insert delete fetch call */ }}
                >Delete</button>
            </section>
        ))}
    </article>
}