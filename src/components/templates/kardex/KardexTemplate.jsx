import { RegisterKardex } from "../../organismos/form/RegisterKardex"
import { TemplateBaseHeader } from "../_base/TemplateBaseHeader"
import { useActionRegister } from "../_base/utils/useActionRegister"
import { KardexTabs } from "./components/KardexTabs"
import { TemplateBaseSectionTitle } from "./components/TemplateBaseSectionTitle"

const title = 'Kardex'

export const KardexTemplate = ({ data }) => {
    const {
        action, openRegister, dataSelect, movementType,
        actionRegister, setOpenRegister
    } = useActionRegister(data)

    return (
        <div className="containerTemplate">
            <TemplateBaseHeader />

            <TemplateBaseSectionTitle
                title={title}
                actionRegister={({movementType, action, data}) => actionRegister({movementType, action, data})}
            />

            <KardexTabs data={data}/>

            <section id="sectionRegister" className="">
                {
                    openRegister && <RegisterKardex
                        dataSelect={dataSelect}
                        action={action}
                        onClose={() => setOpenRegister(!openRegister)}
                        movementType={movementType}
                    />
                }

            </section>


        </div>
    )
}

