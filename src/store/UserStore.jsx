import { create } from "zustand";
import { UserModel } from "../supabase/user.crud";
import { supabase } from "../supabase/supabase.config";
import { APP_CONFIG } from "../utils/dataEstatica";


export const useUserStore = create((set) => ({
    dataUser: [],

    insertUserAdmin: async (p) => {
        const { data, error } = await supabase.auth.signUp({
            email: p.email,
            password: p.password,
            // options: {
            //     emailRedirectTo: 'https//example.com/welcome'
            // }
        })
        if ( error ) {
            console.log('error', error.message)
            return null
        }

        const oUser = new UserModel()
        const dataUser = await oUser.insert({
            id_auth: data.user.id,
            type_user: APP_CONFIG.type_user.admin,
            email: p.email
        })
        if ( oUser.error ) return null
        return dataUser
        
    },

    userGet: async () => {
        const oUserModel = new UserModel()
        const data = await oUserModel.get()
        set({ dataUser: data })
        return data ?? []
    },

    userUpdate: async (p) => {
        const oUserModel = new UserModel()
        await oUserModel.update(p)
        set((state) => ({ dataUser: state.userGet() }))
    }
}))