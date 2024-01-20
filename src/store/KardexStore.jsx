import { create } from "zustand";
import { KardexModel } from "../supabase/kardex.crud";

export const useKardexStore = create((set) => ({
    data: null,
    itemSelect: null,
    strSearch: '',
    parameters: {},

    setStrSearch: (p) => {
        set({ strSearch: p })
    },

    getAll: async (p) => {
        const oModel = new KardexModel()
        const data = await oModel.getAll(p)
        set({ data: data })
        set({ itemSelect: data ? data[0] : null })
        set({ parameters: p })
        return data
    },

    selectKardex: (p) => {
        set({ itemSelect: p })
    },

    insert: async (p) => {
        const oModel = new KardexModel()
        const ok = await oModel.insert(p)
        if ( ok  )
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        return ok
    },

    delete: async (p) => {
        const oModel = new KardexModel()
        const ok = await oModel.delete(p)
        console.log('store.delete', ok)
        if (ok)
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        return ok
    },

    update: async (p) => {
        const oModel = new KardexModel()
        if ( await oModel.update(p) )
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        return oModel.error? oModel.message : null
    },

    filter: async (p) => {
        const oModel = new KardexModel()
        const data = await oModel.filter(p)
        set({ data: data })
        return true
    }


}))