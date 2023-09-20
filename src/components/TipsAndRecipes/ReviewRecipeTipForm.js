import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTipsOrRecipesById, updateTipOrRecipe } from "../../managers/TipsAndRecipesManager";

export const ReviewRecipeTipForm = () => {
    const { recipeTipId } = useParams()
    const [plant, setPlant] = useState({})
    const [showUnapprovedForm, setShowUnapprovedForm] = useState(false)
    const [fetchedRecipeTip, setFetchedRecipeTip] = useState({
        user: 0,
        wild_plant: 0,
        plant_part: 0,
        title: "",
        description: "",
        image: "",
        isRecipe: ""
    })
    const [recipeTip, setRecipeTip] = useState({
        plant_part: 0,
        title: "",
        description: "",
        image: ""
    })

    const navigate = useNavigate()


    useEffect(() => {
        if (recipeTipId) {
            getTipsOrRecipesById(recipeTipId).then((recipeTip) => setFetchedRecipeTip(recipeTip))
        }
    }, [recipeTipId])

    useEffect(() => {
        if (fetchedRecipeTip.id) {
            setRecipeTip({
                id: fetchedRecipeTip.id,
                user: fetchedRecipeTip.user.id,
                wild_plant: fetchedRecipeTip.wild_plant.id,
                plant_part: fetchedRecipeTip.plant_part.id,
                date: fetchedRecipeTip.date,
                title: fetchedRecipeTip.title,
                description: fetchedRecipeTip.description,
                image: fetchedRecipeTip.image,
                isRecipe: fetchedRecipeTip.isRecipe,
                isApproved: fetchedRecipeTip.isApproved,
                needsReview: fetchedRecipeTip.needsReview,
                reasonUnapproved: fetchedRecipeTip.reasonUnapproved
            })
        }
    }, [fetchedRecipeTip])


    const handleApproval = (event) => {
        event.preventDefault()
        recipeTip.needsReview = false
        recipeTip.isApproved = true

        updateTipOrRecipe(recipeTipId, recipeTip).then(() => {
            navigate(`/tips-recipes-review/`);
        })
    }

    const handleRejection = (event) => {
        event.preventDefault()
        recipeTip.needsReview = false
        recipeTip.isApproved = false

        updateTipOrRecipe(recipeTipId, recipeTip).then(() => {
            navigate(`/tips-recipes-review/`);
        })
    }


    return (
        <section className="bg-gray-100 p-4">
      
            <section className="bg-white p-4 rounded-lg shadow-lg">
                <div className="col-span-1">
                    <article
                        className="bg-gray-100 p-4 rounded-lg"
                    >
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">Review "{fetchedRecipeTip.title}"</h2>

                            
                            {fetchedRecipeTip.isRecipe ?
                                <div className="text-gray-600">
                                    Recipe for {fetchedRecipeTip.wild_plant?.common_name} {fetchedRecipeTip.plant_part?.label}
                                </div> :
                                <div className="text-gray-600">
                                    Harvest Tip for {fetchedRecipeTip.wild_plant?.common_name} {fetchedRecipeTip.plant_part?.label}
                                </div>
                            }

                            <div className="text-gray-600">
                                Posted by {fetchedRecipeTip.user.first_name} {fetchedRecipeTip.user.last_name} on {fetchedRecipeTip.date}
                            </div>
                            <div className="text-gray-600">
                                Description: {fetchedRecipeTip.description}
                            </div>
                        </div>
                        <img
                            src={fetchedRecipeTip.image}
                            alt="image associate with fetchedRecipeTip"
                            className="max-h-24 rounded-lg shadow-lg"
                        />
                        </div>
                    </article>
                    <button
                        className="px-2 py-1 mr-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                        onClick={handleApproval}
                    >
                        Approve
                    </button>
                    <button
                        className="px-2 py-1 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                        onClick={() => {
                            setShowUnapprovedForm(true)
                        }}
                    >
                        Not Approved
                    </button>
                    {showUnapprovedForm ?
                        <div className="my-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Explain why this post cannot be approved:
                            </label>
                            <input
                                required
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                                placeholder="..."
                                name="reasonUnapproved"
                                value={recipeTip.reasonUnapproved}
                                onChange={(event) => {
                                    const copy = { ...recipeTip };
                                    copy.reasonUnapproved = event.target.value;
                                    setRecipeTip(copy)
                                }}
                            />
                            <button
                                className="px-2 py-1 mt-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                                onClick={handleRejection}
                            >
                                Submit Review
                            </button>
                        </div> : ""}
                </div>
            </section>
        </section>
    )
}