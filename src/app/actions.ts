'use server';
import { db } from '@/index';
import { catsTable } from '../db/schema';
import { eq } from 'drizzle-orm';


export async function createCat(formData: FormData) {
    
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;
    
    try {
        // CREATE - Insert new cat
        const newCat = await db.insert(catsTable).values({
            name: name,
            image: image,
        }).returning();
        
        console.log("Cat added:", newCat[0]);
    } catch (error) {
        console.error("Error adding cat:", error);
    }
}

// READ - Get all cats
export async function getAllCats() {
    try {
        const cats = await db.select().from(catsTable);
        return { success: true, data: cats };
    } catch (error) {
        console.error("Error fetching cats:", error);
    }
}

// READ - Get cat by ID
export async function getCatById(id: number) {
    try {
        const cat = await db.select().from(catsTable).where(eq(catsTable.id, id));
    } catch (error) {
        console.error("Error fetching cat:", error);
    }
}

// UPDATE - Update cat
export async function updateCat(id: number, name: string, image: string) {
    try {
        const updatedCat = await db.update(catsTable)
            .set({ name, image })
            .where(eq(catsTable.id, id))
            .returning();
    } catch (error) {
        console.error("Error updating cat:", error);
        
    }
}

// DELETE - Delete cat
export async function deleteCat(id: number) {
    try {
        const deletedCat = await db.delete(catsTable)
            .where(eq(catsTable.id, id))
            .returning();
    } catch (error) {
        console.error("Error deleting cat:", error);
    }
}

