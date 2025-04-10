import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditRecipeForm from "./EditRecipeForm";

async function getRecipe(id) {
  try {
    const response = await fetch(`http://localhost:4000/recipes/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
}

export default async function EditRecipePage({ params }) {
  const recipe = await getRecipe(params.id);
  
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center mb-2">
            <h1 className="mb-0 fw-bold">Edit Recipe</h1>
          </div>
          <p className="text-muted">Update the recipe details below</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <EditRecipeForm recipe={recipe} />
        </div>
      </div>
    </div>
  );
}
