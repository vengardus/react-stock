import { create } from "zustand";
import { TypeAccountModel } from "../supabase/typeAccount.crud";


export const useTypeAccountStore = create((set, get) => ({
    typeAccountData: [],

    typeAccountGetAll: async () => {
        if ( get().typeAccountData.length )
            return get().typeAccountData
        
        const oModel = new TypeAccountModel()
        const data = await oModel.getAll()
        set({ typeAccountData: data })
        console.log('getAll')
        return data ?? []
    },

}))