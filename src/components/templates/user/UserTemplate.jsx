import { useState } from "react"
import { RegisterUser } from "../../organismos/form/RegisterUser"
import { useUserStore } from "../../../store/UserStore"
import { TemplateBaseHeader } from "../_base/TemplateBaseHeader"
import { APP_CONFIG } from "../../../utils/dataEstatica"
import { TemplateBaseSectionTitle } from "../_base/TemplateBaseSectionTitle"
import { TemplateBaseSectionSearch } from "../_base/TemplateBaseSectionSearch"
import { ContentActionsTable } from "../../organismos/table/ContentActionsTable"
import { modalAlert } from "../../../utils/modalAlert"
import { TableGeneric } from "../../organismos/table/TableGeneric"

const title = 'Personal'

export const UserTemplate = ({
    users,
}) => {
    const [dataSelect, setDataSelect] = useState([])
    const [action, setAction] = useState("")
    const [openRegister, setOpenRegister] = useState(false)
    const setStrSearch = useUserStore((state) => state.setStrSearch)
    const deleteUser = useUserStore((state) => state.delete)

    const actionRegister = (action = APP_CONFIG.actionCrud.insert, data = []) => {
        setAction(action)
        setDataSelect(data)
        setOpenRegister(!openRegister)
    }

    const editIten = (item) => {
        // if (item.name.trim() == APP_CONFIG.genericDescription) {
        //     modalAlert({ type: 'warning', text: 'No se puede editar usuario genérica.' })
        //     return
        // }
        actionRegister(APP_CONFIG.actionCrud.update, item)
    }

    const deleteItem = (item) => {
        // if (item.name.trim() == APP_CONFIG.genericDescription) {
        //     modalAlert({ type: 'warning', text: 'No se puede eliminar usuario genérica.' })
        //     return
        // }

        modalAlert({ type: 'delete' })
            .then(async (result) => {
                if (result.isConfirmed) {
                    if (await deleteUser({ id: item.id }))
                        modalAlert({ type: 'infoTimer', text: 'Se eliminó registro.' })
                    else
                        modalAlert({ type: 'warning', text: 'Error al eliminar registro.' })
                }
            });
    }

    const tableColumns = [
        {
            accessorKey: "name",
            header: "Nombre",
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "actions",
            header: "Acciones",
            enableSorting: false,
            cell: (info) => <ContentActionsTable
                funcEdit={() => editIten(info.row.original)}
                funcDelete={() => deleteItem(info.row.original)}
            />
        },

    ]

    return (
        <div className="containerTemplate">
            <TemplateBaseHeader />

            <TemplateBaseSectionTitle
                title={title}
                actionRegister={(action, data) => actionRegister(action, data)}
            />

            <TemplateBaseSectionSearch setStrSearch={setStrSearch} />

            <section id="sectionTable" className="px-2 flex flex-col gap-y-3">
                <TableGeneric
                    data={users ?? []}
                    columns={tableColumns}
                    actionRegister={(action, data) => actionRegister(action, data)}
                />
            </section>

            <section id="sectionRegister" className="">
                {
                    openRegister && <RegisterUser
                        dataSelect={dataSelect}
                        action={action}
                        onClose={() => setOpenRegister(!openRegister)}
                    />
                }

            </section>
        </div>
    )
}
