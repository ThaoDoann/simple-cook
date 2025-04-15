import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteRecipeButton from "./DeleteRecipeButton";

// This is a server component that fetches data
async function getRecipes() {
    try {
        const res = await fetch("http://localhost:4000/recipes", { cache: "no-store" });
        if (!res.ok) {
            throw new Error("Failed to fetch recipes");
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
}

export default async function Admin() {
    const recipes = await getRecipes();

    return (
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="mb-0">Recipe Admin Dashboard</h1>
                            <p className="text-muted">Manage your recipe collection</p>
                        </div>
                        <div>
                            <Link href="/collection" className="btn btn-primary me-2">
                                View Collection
                            </Link>
                            <Link href="/admin/create" className="btn btn-success">
                                Create New
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">Recipe Management</h5>
                            <span className="badge bg-primary rounded-pill">{recipes.length} Recipes</span>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light sticky-top">
                                        <tr>
                                            <th className="py-3 px-3">ID</th>
                                            <th className="py-3">Name</th>
                                            <th className="py-3">Category</th>
                                            <th className="py-3">Difficulty</th>
                                            <th className="py-3">Cook Time</th>
                                            <th className="py-3">Vegetarian</th>
                                            <th className="py-3">Ingredients</th>
                                            <th className="py-3">Instructions</th>
                                            <th className="py-3">Image</th>
                                            <th className="py-3 text-center">Edit</th>
                                            <th className="py-3 text-center">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recipes.map((recipe) => (
                                            <tr key={recipe.id}>
                                                <td className="px-3">
                                                    <span className="badge bg-secondary">{recipe.id}</span>
                                                </td>
                                                <td className="fw-medium">{recipe.name}</td>
                                                <td>{recipe.category}</td>
                                                <td>
                                                    <span className={`badge 
                                                        ${recipe.difficulty === 'Easy' ? 'bg-success' :
                                                            recipe.difficulty === 'Medium' ? 'bg-warning text-dark' :
                                                                'bg-danger'
                                                        }`}>
                                                        {recipe.difficulty}
                                                    </span>
                                                </td>
                                                <td>{recipe.cook_time} min</td>
                                                <td className="text-center">
                                                    {recipe.is_vegetarian ? 'Yes' : 'No'}
                                                </td>
                                                <td className="text-truncate" style={{ maxWidth: "150px" }}>
                                                    {recipe.ingredients}
                                                </td>
                                                <td className="text-truncate" style={{ maxWidth: "150px" }}>
                                                    {recipe.instructions}
                                                </td>
                                                <td className="text-truncate" style={{ maxWidth: "100px" }}>
                                                    {recipe.image_url}
                                                </td>
                                                <td className="text-center">
                                                    <Link href={`/admin/edit/${recipe.id}`} className="btn btn-sm btn-outline-primary">
                                                        E
                                                    </Link>
                                                </td>
                                                <td className="text-center">
                                                    <DeleteRecipeButton id={recipe.id} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-footer bg-white py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="text-muted small">
                                    Showing {recipes.length} recipes
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
