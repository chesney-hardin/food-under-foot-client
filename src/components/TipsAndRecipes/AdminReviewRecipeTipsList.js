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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="col-span-1">
                <h1 className="text-lg font-semibold">Tips Ready to Review</h1>
                {unapprovedTips.map((tip) => (
                    <article key={`tip--${tip.id}`} className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-semibold">{tip.title}</h2>
                            <img src={tip.image} alt="image associate with tip" className="max-h-8 rounded-lg shadow-lg" />
                        </div>
                        <div className="text-gray-600">
                            Posted on {tip.date}
                        </div>
                        <div className="text-gray-600">
                            Description: {tip.description}
                        </div>
                        <div>
                            <button
                                className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                                onClick={() => {
                                    navigate(`/tips-recipes-review/${tip.id}`);
                                }}
                            >
                                Review
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            <div className="col-span-1">
                <h1 className="text-lg font-semibold">Recipes</h1>
                {unapprovedRecipes.map((recipe) => (
                    <article key={`recipe--${recipe.id}`} className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-semibold">{recipe.title}</h2>
                            <img src={recipe.image} alt="image associate with tip" className="max-h-8 rounded-lg shadow-lg" />
                        </div>
                        <div className="text-gray-600">
                            Posted on {recipe.date}
                        </div>
                        <div className="text-gray-600">
                            Description: {recipe.description}
                        </div>

                        <div>
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