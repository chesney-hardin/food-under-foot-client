import { useEffect, useState } from "react"
import { getUnapprovedRecipesForReview, getUnapprovedTipsForReview } from "../../managers/TipsAndRecipesManager"
import { useNavigate } from "react-router-dom"

export const AdminReviewRecipeTipList = () => {
    const [unapprovedTips, setUnapprovedTips] = useState([])
    const [unapprovedRecipes, setUnapprovedRecipes] = useState([])

    const navigate = useNavigate()


    useEffect(() => {
        getAllRecipesAndTipsForReview()
    }, [])

    const getAllRecipesAndTipsForReview = () => {
        getUnapprovedTipsForReview().then((tips) => setUnapprovedTips(tips))
        getUnapprovedRecipesForReview().then((recipes) => setUnapprovedRecipes(recipes))
    }


    return <>
        <ol className="border-fuf-green bg-fuf-teal bg-opacity-40 border rounded-lg p-8 shadow list-disc mx-24 my-10">
            <li>Review the recipe or harvest tip to make sure all information complies with our safety guidelines and sustainable harvesting principles.</li>
            <li>If the post does not meet our guidelines, mark as "not approved" and provide a reason. The user will be given a chance to edit the information and submit for review again.</li>
            <li>If the post does meet our guidelines, then mark as "approved" and the post will be made public and appear on the corresponding plant profile.</li>
        </ol>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg mx-5">
                <h1 className="text-2xl font-semibold mb-4">Tips Ready to Review</h1>
                {unapprovedTips.map((tip) => (
                    <article key={`tip--${tip.id}`} className="bg-gray-100 shadow p-4 rounded-lg">
                        <div className="flex">
                            <h2 className="text-lg font-semibold">{tip.title}</h2>
                            {/* <img src={tip.image} alt="image associate with tip" className="max-h-10 rounded-lg shadow-lg" /> */}
                        </div>
                        <div className="text-gray-600 flex justify-between">
                            Posted on {tip.date} by {tip.user.first_name} {tip.user.last_name}
                            <button
                                className="px-2 py-1 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                                onClick={() => {
                                    navigate(`/tips-recipes-review/${tip.id}`);
                                }}
                            >
                                Review
                            </button>
                        </div>
                        <div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg mx-5">
                <h1 className="text-2xl font-semibold mb-4">Recipes Ready to Review</h1>
                {unapprovedRecipes.map((recipe) => (
                    <article key={`recipe--${recipe.id}`} className="bg-gray-100 p-4 shadow rounded-lg">
                        <div className="flex">
                            <h2 className="text-lg font-semibold">{recipe.title}</h2>
                        </div>
                        <div className="text-gray-600 flex justify-between">
                            Posted on {recipe.date} by {recipe.user.first_name} {recipe.user.last_name}
                            <button
                                className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                                onClick={() => {
                                    navigate(`/tips-recipes-review/${recipe.id}`);
                                }}
                            >
                                Review
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </>
}