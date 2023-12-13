import { create } from "zustand";
import { CategoryModel } from "../supabase/category.crud";


export const useCategoryStore = create((set) => ({
    categoryData: [],

    categoryGetAll: async () => {
        const oModel = new CategoryModel()
        const data = await oModel.getAll()
        set({ categoryData: data })
        return data ?? []
    },
    
}))