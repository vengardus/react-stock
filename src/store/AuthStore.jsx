import { create } from "zustand"
import { supabase } from "../supabase/supabase.config";
import { consoleError } from "../utils/messages";


export const useAuthStore = create((set) => ({
    isAuth: false,

    signInWithGoogle: async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google"
            })

            if (error) throw new error('Ocurrió un error durante la autenticación.')

            set({ isAuth: true })

            return data
        }
        catch (error) {
            consoleError(error, useAuthStore.name)
        }
    },

    signOut: async () => {
        const { error } = supabase.auth.signOut()
        if (error) throw new error('Ocurrió un error durante el cierre de sesión')

        set({ isAuth: false })
    }
}))