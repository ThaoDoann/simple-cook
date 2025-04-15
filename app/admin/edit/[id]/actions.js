'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function checkIdExists(id, currentId) {
  try {
    const response = await fetch(`http://localhost:4000/recipes/${id}`);
    if (!response.ok) return false;
    const data = await response.json();
    // Return true only if the ID exists and it's not the current recipe being edited
    return data.id !== currentId;
  } catch (error) {
    return false;
  }
}

export async function updateRecipe(id, data) {
  try {
    // If the ID is being changed, check if the new ID already exists
    if (data.id !== id) {
      const idExists = await checkIdExists(data.id, id);
      if (idExists) {
        throw new Error(`Recipe with ID ${data.id} already exists. Please choose a different ID.`);
      }
    }

    const response = await fetch(`http://localhost:4000/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update recipe');
    }

    // Revalidate all relevant routes
    revalidatePath('/collection');
    revalidatePath(`/collection/${id}`);
    revalidatePath('/admin');
    revalidatePath(`/admin/edit/${id}`);
    
    return { success: true };
  } catch (error) {
    throw new Error('Failed to update recipe: ' + error.message);
  }
} 