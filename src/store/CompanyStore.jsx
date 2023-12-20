import { create } from "zustand";
import { CompanyModel } from "../supabase/company.crud";


export const useCompanyStore = create((set) => ({
    data: [],

    getAllByUser: async (p) => {
        const oModel = new CompanyModel()
        const data = await oModel.getAllByUser(p)
        set({ data: data })
        return data ?? []
    },

}))