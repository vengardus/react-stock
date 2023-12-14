import { useAuthWithEmailStore } from "../../store/AuthWithEmailStore"
import { BtnSave } from "../moleculas/BtnSave"
import { HeaderSecondary } from "../organismos/HeaderSecondary"

export const HomeTemplate = () => {
    const signOut = useAuthWithEmailStore((state) => state.signOut)

    return (
        <div className="containerTemplate">
            <header className="flex align-middle h-[70px]">
                <HeaderSecondary />
            </header>

            <section id="title" className="flex justify-evenly font-black text-xl">
                <BtnSave 
                    title={'Cerrar sesión'}
                    func={signOut}
                />
            </section>

            <section id="resumen" className="">
            </section>

            <section className="">
            </section>
        </div>
    )
}

