'use server';

import { revalidatePath } from 'next/cache';

export async function deleteRecipe(id) {
  try {
    const response = await fetch(`http://localhost:4000/recipes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete recipe with ID ${id}`);
    }

    // Revalidate all relevant paths
    revalidatePath('/collection');
    revalidatePath(`/collection/${id}`);
    revalidatePath('/admin');

    return { success: true };
    
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return { success: false, error: error.message };
  }
} 