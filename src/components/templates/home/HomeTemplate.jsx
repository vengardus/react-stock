import { useState } from "react"
import { Header } from "../../organismos/Header"
import { BannerCompany } from "../../organismos/BannerCompany"
import { useCompanyStore } from "../../../store/CompanyStore"


export const HomeTemplate = () => {
    const [state, setState] = useState(false)
    const dataCompany = useCompanyStore((state) => state.data)

    return (
        <div className="containerTemplate">
            <header className="flex align-middle h-[70px]">
                <Header
                    stateConfig={{
                        state: state,
                        setState: () => setState(!state)
                    }}
                />
            </header>

            <section id="section1" className="flex justify-end">
                <div className="title">Tu Empresa</div>
            </section>

            <section className="h-screen w-100">
                <BannerCompany
                    companyName={dataCompany?.inv_companies?.name}
                    currencySymbol={dataCompany?.inv_companies?.currency_symbol}
                />
            </section>
        </div>
    )
}

