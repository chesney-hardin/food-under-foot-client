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
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg mx-5">
                <h1 className="text-2xl font-semibold mb-4">Tips</h1>
                {tips.map((tip) => (
                    <article key={`tip--${tip.id}`} className="bg-gray-100 p-4 shadow rounded-lg">
                        <img src={tip.image} alt="harvest tip" className="max-h-24 m-1 rounded-lg shadow-lg" style={{ float: 'right' }} />
                        <h2 className="text-lg font-semibold">{tip.title}</h2>
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
                        <div className="flex">
                            <button
                                className="mr-2 btn"
                                onClick={() => {
                                    navigate(`/edit-tip/${tip.id}`);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn"
                                onClick={() => {
                                    destroyTipOrRecipe(tip.id)
                                }}
                            >
                                Delete
                            </button> </div>
                    </article>
                ))}
            </div>

            <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg mx-5">
                <h1 className="text-2xl mb-4 font-semibold">Recipes</h1>
                {recipes.map((recipe) => (
                    <article key={`recipe--${recipe.id}`} className="bg-gray-100 p-4 rounded-lg shadow">

                        <img src={recipe.image} alt="recipe" className="max-h-24 m-1 rounded-lg shadow-lg" style={{ float: 'right' }} />
                        <h2 className="text-lg font-semibold">{recipe.title}</h2>
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
                                className="mr-2 btn"
                                onClick={() => {
                                    navigate(`/edit-recipe/${recipe.id}`);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn"
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