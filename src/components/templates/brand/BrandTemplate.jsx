import { useState } from "react"
import { Header } from "../../organismos/Header"
import { TableBrand } from "../../organismos/table/TableBrand"


export const BrandTemplate = ({
    brands
}) => {
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
                {
                    brands?.map(item => (
                        <div key={item.id}>{item.description}</div>
                    ))
                }
            </section>

            <section id="section2" className="">
                <TableBrand 
                    data={brands?? []}
                />
            </section>

            <section className="">
            </section>
        </div>
    )
}

