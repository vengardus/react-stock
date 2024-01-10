import { create } from "zustand";
import { CompanyModel } from "../supabase/company.crud";


export const useCompanyStore = create((set) => ({
    data: null,
    countUsersCompany: 0,

    getByUser: async (p) => {
        const oModel = new CompanyModel()
        const data = await oModel.getByUser(p)
        set({ data: data?.inv_companies })
        return data?.inv_companies?? []
    },

    getCountUsersCompany: async (p) => {
        const oModel = new CompanyModel()
        const data = await oModel.getCountUserByCompany({
            id_company: p.id_company
        })
        set({ countUsersCompany: data?? 0 })
        return data?? 0
    }

}))