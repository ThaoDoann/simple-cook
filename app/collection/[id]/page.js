import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

// Function to fetch a single recipe by ID
async function getRecipe(id) {
  try {
    const res = await fetch(`http://localhost:4000/recipes/${id}`, { cache: "no-store" });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}

// Generate static params for the first 10 recipes
export async function generateStaticParams() {
    try {
      // Fetch all recipes from the API
      const res = await fetch('http://localhost:4000/recipes');
      const recipes = await res.json();
      
      // Take only the first 10 recipes (or fewer if there are less than 10)
      const firstTenRecipes = recipes.slice(0, 10);
      
      // Return the params for each recipe
      return firstTenRecipes.map((recipe) => ({
        id: recipe.id.toString(),
      }));
    } catch (error) {
      console.error("Error generating static params:", error);
      return [];
    }
  }

export default async function RecipeDetail({ params }) {
  const recipe = await getRecipe(params.id);

  // Handle case where recipe doesn't exist
  if (!recipe) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Recipe Not Found</h4>
          <p>No recipe with the ID {params.id} exists.</p>
          <hr />
          <Link href="/collection" className="btn btn-outline-danger">
            Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link href="/collection" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>Back
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{recipe.name}</h2>
        </div>
        <div className="card-body">
          <div className="row">
            {/* Back button */}
            <div className="col-md-4 mb-4">
              <div className="position-relative" style={{ height: "300px" }}>
                <Image
                  src={`${recipe.image_url}`}
                  alt={recipe.name}
                  fill
                  className="object-fit-cover rounded"
                />
              </div>
            </div>

            {/* Recipe details */}
            <div className="col-md-8">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th scope="row" style={{ width: "30%" }}>ID</th>
                    <td>{recipe.id}</td>
                  </tr>
                  <tr>
                    <th scope="row">Category</th>
                    <td>{recipe.category}</td>
                  </tr>
                  <tr>
                    <th scope="row">Difficulty</th>
                    <td>{recipe.difficulty}</td>
                  </tr>
                  <tr>
                    <th scope="row">Cook Time</th>
                    <td>{recipe.cook_time} minutes</td>
                  </tr>
                  <tr>
                    <th scope="row">Vegetarian</th>
                    <td>{recipe.is_vegetarian ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Ingredients</th>
                    <td>{recipe.ingredients}</td>
                  </tr>
                  <tr>
                    <th scope="row">Instructions</th>
                    <td>{recipe.instructions}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

