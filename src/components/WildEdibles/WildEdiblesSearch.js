import { useEffect, useState } from "react"
import { getPlantParts } from "../../managers/PlantPartsManager"

export const WildEdiblesSearch = ({ setSearchState }) => {
    const [plantParts, setPlantParts] = useState([])
    const [search, setSearch] = useState({
        name: "",
        partId: 0
    })

    useEffect(() => {
        getPlantParts().then((parts) => setPlantParts(parts));
    }, [])


    return <>
        <input
            className="mt-1 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
            name="name"
            onChange={(event) => {
                const copy = { ...search }
                copy.name = event.target.value
                setSearch(copy);
            }}
            type="text" placeholder="Search common names" />

        <div className="mb-4">
            <label htmlFor="plant_part">Plant Part:</label>
            <select
                value={search.partId}
                name="partId"
                onChange={(event) => {
                    const copy = { ...search };
                    copy.partId = parseInt(event.target.value)
                    setSearch(copy)
                }}
                className="form-select"
            >
                <option value="0">Select Edible Part</option>
                {plantParts.map((plantPart) => (
                    <option
                        key={`plantPart--${plantPart.id}`}
                        value={plantPart.id}
                    >
                        {plantPart.label}
                    </option>
                ))}
            </select>
        </div>

        <button className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
            onClick={() => { setSearchState(search) }}>Search</button>
    </>
}