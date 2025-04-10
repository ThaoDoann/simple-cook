'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateRecipe(id, data) {
  try {
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