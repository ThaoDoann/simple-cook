'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function checkIdExists(id) {
  try {
    const response = await fetch(`http://localhost:4000/recipes/${id}`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

export async function createRecipe(data) {
  try {
    // Check if ID already exists
    const idExists = await checkIdExists(data.id);
    if (idExists) {
      throw new Error(`Recipe with ID ${data.id} already exists. Please choose a different ID.`);
    }

    const response = await fetch('http://localhost:4000/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create recipe');
    }

    revalidatePath('/collection');
    revalidatePath('/admin');
    
    return { success: true };
  } catch (error) {
    throw new Error('Failed to create recipe: ' + error.message);
  }
} 