import { useMutation } from "@tanstack/react-query"
import { HeaderSecondary } from "../../organismos/HeaderSecondary"
import { useUserStore } from "../../../store/UserStore"
import { useNavigate } from "react-router-dom"
import { BtnSave } from "../../moleculas/BtnSave"


export const LoginTemplate = () => {
    const navigate = useNavigate()
    const insertUserAdmin = useUserStore((state) => state.insertUserAdmin)
    const mutationInsertUser = useMutation({
        mutationKey: ['insertUsdrAdmin'],
        mutationFn: async() => {
            const p = {
                email: "prueba4@gmail.com",
                password: "1234567"
            }
            const data = await insertUserAdmin(p)
            if ( data ) navigate('/')
        }
    })

    return (
        <div className="containerTemplate">
            <header className="flex align-middle h-[70px]">
                <HeaderSecondary />
            </header>

            <section id="title" className="flex justify-evenly font-black text-xl">
                <BtnSave 
                    title={'Login'}
                    func={mutationInsertUser.mutateAsync}
                />
            </section>

            <section id="resumen" className="">
            </section>

            <section className="">
            </section>
        </div>
    )
}

