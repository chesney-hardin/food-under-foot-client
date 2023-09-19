import { useState } from "react"

export const HarvestLogSearch = ({ setSearchTerms }) => {
    const [searchTitle, setSearchTitle] = useState("")
    return <>
        <input
            className="ml-5 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
            onChange={
                (changeEvent) => {
                    setSearchTitle(changeEvent.target.value)
                }
            }
            type="text" placeholder="Search titles" />

        <button className="px-4 py-2 m-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
            onClick={() => { setSearchTerms(searchTitle) }}>Search</button>
    </>
}