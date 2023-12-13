import { create } from "zustand";
import { AccountModel } from "../supabase/account.crud";


export const useAccountStore = create((set) => ({
    accountData: [],
    accountGroupByTypeData: [],

    accountGetAll: async (p) => {
        const oModel = new AccountModel()
        const data = await oModel.getByField('id_user', p.id_user)
        set({ accountData: data })
        return data ?? []
    },

    accountGetAllGroupByType: async (p) => {
        const oModel = new AccountModel()
        const data = await oModel.getAllGroupByType(p)
        console.log(data)
        set({accountGroupByTypeData: data})
        return data?? []
    }
    
}))