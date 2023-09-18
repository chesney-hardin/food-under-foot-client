import { useEffect, useState } from "react"
import { getApprovedRecipesByPlantId, getApprovedTipsByPlantId } from "../../managers/TipsAndRecipesManager"

export const TipsAndRecipesList = ({ plantId }) => {
    const [approvedTips, setApprovedTips] = useState([])
    const [approvedRecipes, setApprovedRecipes] = useState([])


    useEffect(() => {
        if (plantId) {
            getApprovedTipsByPlantId(plantId).then((tips) => setApprovedTips(tips))
            getApprovedRecipesByPlantId(plantId).then((recipes) => setApprovedRecipes(recipes))
        }
    }, [plantId])


    return <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <h2>Tips</h2>
            {approvedTips.map((tip) => (
                <article key={`tip--${tip.id}`} className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold">{tip.title}</h2>
                        <img src={tip.image} alt="image associate with tip" className="max-h-8 rounded-lg shadow-lg" />
                    </div>
                    <div className="text-gray-600">
                        Posted by {tip.user.first_name} {tip.user.last_name} on {tip.date}
                    </div>
                    <div className="text-gray-600">
                        Description: {tip.description}
                    </div>

                </article>
            ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <h2>Recipes</h2>
            {approvedRecipes.map((recipe) => (
                <article key={`recipe--${recipe.id}`} className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold">{recipe.title}</h2>
                        <img src={recipe.image} alt="image associate with tip" className="max-h-8 rounded-lg shadow-lg" />
                    </div>
                    <div className="text-gray-600">
                        Posted by {recipe.user.first_name} {recipe.user.last_name} on {recipe.date}
                    </div>
                    <div className="text-gray-600">
                        Description: {recipe.description}
                    </div>
                </article>
            ))}
        </div>
    </>
}