'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateRecipe } from './actions';

export default function EditRecipeForm({ recipe }) {
    const router = useRouter();
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setValidationErrors([]);

        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData(form);
            const data = {
                id: recipe.id,
                name: formData.get('name'),
                ingredients: formData.get('ingredients'),
                instructions: formData.get('instructions'),
                cook_time: parseInt(formData.get('cook_time')),
                difficulty: formData.get('difficulty'),
                image_url: formData.get('image_url'),
                is_vegetarian: formData.get('is_vegetarian') === 'true',
                category: formData.get('category')
            };

            const result = await updateRecipe(recipe.id, data);
            if (result.success) {
                router.push('/admin');
                router.refresh();
            }
        } catch (err) {
            setError(err.message || 'Failed to update recipe');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card shadow-lg border-0 rounded-3">
            <div className="card-header bg-primary text-white py-3">
                <h5 className="mb-0 fw-bold">
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Recipe
                </h5>
            </div>
            <div className="card-body p-4">
                {error && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        <div>{error}</div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className={`needs-validation ${validated ? 'was-validated' : ''}`} noValidate >

                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="id" name="id" placeholder="Recipe ID"
                                    defaultValue={recipe.id} min="1" required />
                                <label htmlFor="id">Recipe ID</label>
                                <div className="invalid-feedback">
                                    Please provide a unique ID for the recipe.
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="name" name="name" placeholder="Recipe Name"
                                    defaultValue={recipe.name} minLength="3" maxLength="50" required />
                                <label htmlFor="name">Recipe Name</label>
                                <div className="invalid-feedback">
                                    Recipe name must be between 3 and 50 characters in length.
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="category" name="category" placeholder="Category"
                                    defaultValue={recipe.category} maxLength="20" required />
                                <label htmlFor="category">Category</label>
                                <div className="invalid-feedback">
                                    Category is required and cannot exceed 20 characters in length.
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <select className="form-select" id="is_vegetarian" name="is_vegetarian"
                                    defaultValue={recipe.is_vegetarian.toString()} required >
                                    <option value="">Select preference</option>
                                    <option value="true">Vegetarian</option>
                                    <option value="false">Non-Vegetarian</option>
                                </select>
                                <label htmlFor="is_vegetarian">Dietary Preference</label>
                                <div className="invalid-feedback">
                                    Please specify if the recipe is vegetarian or not.
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="cook_time" name="cook_time" placeholder="Cook Time"
                                    defaultValue={recipe.cook_time} min="1" required />
                                <label htmlFor="cook_time">Cook Time (minutes)</label>
                                <div className="invalid-feedback">
                                    Cook time must be a positive integer.
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating mb-3">
                                <select className="form-select" id="difficulty" name="difficulty" defaultValue={recipe.difficulty} required >
                                    <option value="">Select difficulty</option>
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                                <label htmlFor="difficulty">Difficulty Level</label>
                                <div className="invalid-feedback">
                                    Difficulty level must be one of: Easy, Medium, or Hard.
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-floating mb-3">
                                <textarea className="form-control" id="ingredients" name="ingredients" placeholder="Ingredients"
                                    defaultValue={recipe.ingredients} rows="3" style={{ height: '150px' }} required ></textarea>
                                <label htmlFor="ingredients">Ingredients</label>
                                <div className="invalid-feedback">
                                    Ingredients are required.
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-floating mb-3">
                                <textarea className="form-control" id="instructions" name="instructions" placeholder="Instructions"
                                    defaultValue={recipe.instructions} rows="3" style={{ height: '150px' }} required ></textarea>
                                <label htmlFor="instructions">Instructions</label>
                                <div className="invalid-feedback">
                                    Instructions are required.
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="image_url" name="image_url" placeholder="Image URL"
                                    defaultValue={recipe.image_url} required />
                                <label htmlFor="image_url">Image URL</label>
                                <div className="invalid-feedback">
                                    Please provide a valid URL for the recipe image.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-end gap-3 mt-5">
                        <button type="button" onClick={() => router.back()} className="btn btn-outline-secondary px-4">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary px-4" disabled={loading} >
                            Update Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 