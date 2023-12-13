import { create } from "zustand";
import { UserModel } from "../supabase/user.crud";


export const useUserStore = create((set) => ({
    dataUser: [],

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