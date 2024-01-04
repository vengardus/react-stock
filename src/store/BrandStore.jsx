import { create } from "zustand";
import { BrandModel } from "../supabase/brand.crud";

export const useBrandStore = create((set, get) => ({
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
        const ok = await oModel.insert(p)
        if ( ok  )
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        return ok
        // const getAll = get().getAll
        // const parameters = get().parameters
        // set(getAll(parameters))
    },

    delete: async (p) => {
        const oModel = new BrandModel()
        const ok = await oModel.delete(p)
        console.log('store.delete', ok)
        if (ok)
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        return ok
    },

    update: async (p) => {
        const oModel = new BrandModel()
        if ( await oModel.update(p) )
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        return oModel.error? oModel.message : null
    },

    filter: async (p) => {
        const oModel = new BrandModel()
        const data = await oModel.filter(p)
        set({ data: data })
        return true
    }


}))