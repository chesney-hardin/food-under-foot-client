import { useEffect, useState } from "react"
import { deleteTipOrRecipe, getCurrentUsersRecipes, getCurrentUsersTips } from "../../managers/TipsAndRecipesManager"
import { useNavigate } from "react-router-dom"

export const UserTipsAndRecipes = () => {
    const [tips, setTips] = useState([])
    const [recipes, setRecipes] = useState([])

    const navigate = useNavigate()


    useEffect(() => {
        getAllUsersRecipesAndTips()
    }, [])

    const getAllUsersRecipesAndTips = () => {
        getCurrentUsersTips().then((tips) => setTips(tips))
        getCurrentUsersRecipes().then((recipes) => setRecipes(recipes))
    }

    const destroyTipOrRecipe = (id) => {
        const userConfirmed = window.confirm(
            "Are you sure you want to PERMANENTLY DELETE this tip/recipe? This cannot be undone."
        )
        if (userConfirmed) {
            deleteTipOrRecipe(id).then(() => {
                getAllUsersRecipesAndTips()
            })
        }
    }


    return <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="col-span-1">
                <h1 className="text-lg font-semibold">Tips</h1>
                {tips.map((tip) => (
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
                        {tip.needsReview ?
                            <div>***This tip is still waiting for review.***</div>
                            : tip.isApproved ?
                                <div>***Approved***</div>
                                : <div>
                                    <div>***Not Approved***</div>
                                    <div>Reason: {tip.reasonUnapproved}</div>
                                </div>}
                        <div>
                            <button
                                className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                                onClick={() => {
                                    navigate(`/edit-tip/${tip.id}`);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                                onClick={() => {
                                    destroyTipOrRecipe(tip.id)
                                }}
                            >
                                Delete
                            </button> </div>
                    </article>
                ))}
            </div>

            <div className="col-span-1">
                <h1 className="text-lg font-semibold">Recipes</h1>
                {recipes.map((recipe) => (
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
                        {recipe.needsReview ?
                            <div>***This recipe is still waiting for review.***</div>
                            : recipe.isApproved ?
                                <div>***Approved***</div>
                                : <div>
                                    <div>***Not Approved***</div>
                                    <div>Reason: {recipe.reasonUnapproved}</div>
                                </div>}

                        <div>
                            <button
                                className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                                onClick={() => {
                                    navigate(`/edit-recipe/${recipe.id}`);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-fuf-teal text-white rounded-md hover:bg-fuf-teal-600 focus:outline-none focus:ring focus:ring-fuf-teal focus:ring-opacity-50"
                                onClick={() => {
                                    destroyTipOrRecipe(recipe.id)
                                }}
                            >
                                Delete
                            </button> </div>
                    </article>
                ))}
            </div>
        </div>
    </>
}