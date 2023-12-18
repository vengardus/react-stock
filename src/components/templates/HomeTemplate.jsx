import { useState } from "react"
import { Header } from "../organismos/Header"

export const HomeTemplate = () => {
    const [state, setState] = useState(false)
    

    return (
        <div className="containerTemplate">
            <header className="flex align-middle h-[70px]">
                <Header
                    stateConfig={{
                        state:state, 
                        setState:()=>setState(!state)
                    }}
                />
            </header>

            <section id="section1" className="">
            </section>

            <section id="section2" className="">
            </section>

            <section className="">
            </section>
        </div>
    )
}

