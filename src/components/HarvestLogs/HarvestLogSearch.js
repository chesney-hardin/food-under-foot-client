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
            type="text" placeholder="Search by title" />

        <button className="btn"
            onClick={() => { setSearchTerms(searchTitle) }}>Search</button>
    </>
}