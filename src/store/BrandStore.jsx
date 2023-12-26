import { create } from "zustand";
import { BrandModel } from "../supabase/brand.crud";

export const useBrandStore = create((set) => ({
    data: null,
    itemSelect: null,
    strSearch: '',
    parameters: {},

    setStrSearch: (p) => {
        set({ strSearch: p })
    },

    getAll: async (p) => {
        const oModel = new BrandModel()
        const data = await oModel.getAll(p)
        set({ data: data })
        set({ itemSelect: data ? data[0] : null })
        set({ parameters: p })
        return data
    },

    selectBrand: (p) => {
        set({ itemSelect: p })
    },

    insert: async (p) => {
        const oModel = new BrandModel()
        await oModel.insert(p)
        set((state) => ({
            data: state.getAll(state.parameters)
        }))
    },

    delete: async (p) => {
        const oModel = new BrandModel()
        await oModel.delete(p)
        set((state) => ({
            data: state.getAll(state.parameters)
        }))
    },

    update: async (p) => {
        const oModel = new BrandModel()
        await oModel.update(p)
        set((state) => ({
            data: state.getAll(state.parameters)
        }))
    },

    filter: async (p) => {
        const oModel = new BrandModel()
        const data = await oModel.filter(p)
        set({ data: data })
    }


}))