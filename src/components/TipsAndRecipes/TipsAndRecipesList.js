import { useEffect, useState } from "react"
import { getApprovedRecipesByPlantId, getApprovedTipsByPlantId } from "../../managers/TipsAndRecipesManager"
import { useNavigate } from "react-router-dom"

export const TipsAndRecipesList = ({ plantId, staff }) => {
  const [approvedTips, setApprovedTips] = useState([])
  const [approvedRecipes, setApprovedRecipes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (plantId) {
      getApprovedTipsByPlantId(plantId).then((tips) => setApprovedTips(tips))
      getApprovedRecipesByPlantId(plantId).then((recipes) => setApprovedRecipes(recipes))
    }
  }, [plantId])


  return <>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="col-span-1">
        <h2 className="text-lg font-semibold"> Harvest Tips</h2>
        {!staff &&
          <button
            className="my-2 btn"
            onClick={() => {
              navigate(`/add-tip/${plantId}`);
            }}
          >
            Add a Tip
          </button>
        }
        {approvedTips.map((tip) => (
          <article
            key={`tip--${tip.id}`}
            className="bg-gray-100 p-4 rounded-lg shadow-lg"
          >
            <div>
              <h2 className="text-lg font-semibold">{tip.title}</h2>
              <img
                src={tip.image}
                alt="image associate with tip"
                className="max-h-24 m-2 rounded-lg shadow-lg"
                style={{ float: 'right' }}
              />
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

      <div className="col-span-1">
        <h2 className="text-lg font-semibold">Recipes</h2>
        {!staff &&
          <button
            className="my-2 btn"
            onClick={() => {
              navigate(`/add-recipe/${plantId}`);
            }}
          >
            Add a Recipe
          </button>}
        {approvedRecipes.map((recipe) => (
          <article
            key={`recipe--${recipe.id}`}
            className="bg-gray-100 p-4 rounded-lg shadow-lg"
          >
            <div>
              <h2 className="text-lg font-semibold">{recipe.title}</h2>
              <img
                src={recipe.image}
                alt="image associate with tip"
                className="max-h-24 m-2 rounded-lg shadow-lg"
                style={{ float: 'right' }}
              />
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
    </div>
  </>
}