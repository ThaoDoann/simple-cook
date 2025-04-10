import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

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

export default async function Collection() {
  const recipes = await getRecipes();

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Recipe Collection</h1>
      
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="row g-0 h-100">
                <div className="col-md-4">
                  <div className="position-relative h-100" style={{ minHeight: "150px" }}>
                    <Image 
                      src={`${recipe.image_url}`} alt={recipe.name} fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-fit-cover rounded-start"
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body d-flex flex-column h-100">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0">{recipe.name}</h5>
                      <span className="badge bg-primary">ID: {recipe.id}</span>
                    </div>
                    <p className="card-text text-muted small">
                      {recipe.category} • {recipe.difficulty} • {recipe.cook_time} min
                    </p>
                    <div className="mt-auto">
                      <Link href={`/collection/${recipe.id}`} className="btn btn-outline-primary btn-sm">
                        More Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
