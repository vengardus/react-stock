import { RegisterProduct } from "../../organismos/form/RegisterProduct"
import { useActionRegister } from "../_base/utils/useActionRegister"
import { TemplateBaseHeader } from "../_base/TemplateBaseHeader"
import { TemplateBaseSectionTitle } from "../_base/TemplateBaseSectionTitle"
import { Search } from "./components/Search"
import { Table } from "./components/Table"

const title = 'Productos'

export const ProductTemplate = ({
    data
}) => {
    const {
        action, openRegister, dataSelect,
        actionRegister, setOpenRegister
    } = useActionRegister(data)

    return (
        <div className="containerTemplate">
            <TemplateBaseHeader />

            <TemplateBaseSectionTitle
                title={title}
                // actionRegister={() => actionRegister()}
                actionRegister={({ action, data }) => actionRegister({ action, data })}
            />

            <Search />

            <section id="sectionTable" className="px-2 flex flex-col gap-y-3">
                <Table
                    data={data ?? []}
                    actionRegister={actionRegister}
                />
            </section>

            <section id="sectionRegister" className="">
                {
                    openRegister && <RegisterProduct
                        dataSelect={dataSelect}
                        action={action}
                        onClose={() => setOpenRegister(!openRegister)}
                    />
                }

            </section>
        </div>
    )
}

