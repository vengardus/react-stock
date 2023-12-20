import { create } from "zustand";
import { UserModel } from "../supabase/user.crud";
import { supabase } from "../supabase/supabase.config";
import { APP_CONFIG } from "../utils/dataEstatica";


export const useUserStore = create((set) => ({
    data: [],

    insertAdmin: async (p) => {
        const { data, error } = await supabase.auth.signUp({
            email: p.email,
            password: p.password,
            // options: {
            //     emailRedirectTo: 'https//example.com/welcome'
            // }
        })
        if ( error ) 
            return [null, error.message]

        const oUser = new UserModel()
        const dataUser = await oUser.insert({
            id_auth: data.user.id,
            email: p.email,
            type_user: APP_CONFIG.type_user.admin
        })
        return [dataUser, oUser.error?? null]        
    },

    get: async () => {
        const oUserModel = new UserModel()
        const data = await oUserModel.get()
        set({ dataUser: data })
        return data ?? []
    },

    update: async (p) => {
        const oUserModel = new UserModel()
        await oUserModel.update(p)
        set((state) => ({ dataUser: state.userGet() }))
    }
}))