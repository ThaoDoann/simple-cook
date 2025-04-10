import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CreateRecipeForm from "./CreateRecipeForm";

export default function CreateRecipePage() {
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center mb-2">
            <h1 className="mb-0 fw-bold">Create New Recipe</h1>
          </div>
          <p className="text-muted">Add a new recipe to your collection with all the details</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <CreateRecipeForm />
        </div>
      </div>
    </div>
  );
}
