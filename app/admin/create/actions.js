'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createRecipe(data) {
  try {
    console.log("data", data);

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