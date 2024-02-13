//import { useUserStore } from "../../../../store/UserStore"
import { useState } from "react"
import { APP_CONFIG } from "../../../../utils/dataEstatica"
import { modalAlert } from "../../../../utils/modalAlert"
import { ContentActionsTable } from "../../../organismos/table/ContentActionsTable"
import { TableGeneric } from "../../../organismos/table/TableGeneric"
import { useEffect } from "react"
import { getDeviceType } from "../../../../utils/deviceType"
import { deviceTypes } from "../../../../styles/breakpoints"


export const UserTable = ({
    data,
    actionRegister,
}) => {
    //const deleteUser = useUserStore((state) => state.delete)
    const [device, setDevice] = useState(0)

    useEffect(()=>{
        setDevice(getDeviceType())
    }, [])


    const editItem = (item) => {
        if (item.type_user.trim() == APP_CONFIG.type_user.admin) {
            modalAlert({ type: 'warning', text: 'No se puede modificar usuario superadmin.' })
            return
        }
        actionRegister({ action: APP_CONFIG.actionCrud.update, data: item })
    }

    const deleteItem = (item) => {
        if (item.type_user.trim() == APP_CONFIG.type_user.admin) {
            modalAlert({ type: 'warning', text: 'No se puede eliminar usuario admin.' })
            return
        }
        modalAlert({ type: 'warning', text: 'No se puede eliminar usuario' })
        return
        // modalAlert({ type: 'delete' })
        //     .then(async (result) => {
        //         if (result.isConfirmed) {
        //             if (await deleteUser({ id: item.id }))
        //                 modalAlert({ type: 'infoTimer', text: 'Se eliminó registro.' })
        //             else
        //                 modalAlert({ type: 'warning', text: 'Error al eliminar registro.' })
        //         }
        //     });
    }

    const tableColumns = [
        {
            accessorKey: "name",
            header: "Nombre",
            cell: (info) => <span>
                {
                (device == deviceTypes.mobile)?
                        info.getValue().substr(0,15)+'...' : info.getValue()
                }
            </span>
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: (info) => <span className="w-1/12 text-ellipsis overflow-hidden ...">
                {
                    (device == deviceTypes.mobile)?
                        info.getValue().substr(0,10)+'...' : info.getValue()
                }
            </span>
        },
        {
            accessorKey: "type_user",
            header: (device == deviceTypes.mobile)? "T" : "TipoUser",
            enableSorting: false,
            cell: (info) => <span className="">{
                (device == deviceTypes.mobile)? info.getValue().substr(0, 1).toUpperCase() : info.getValue().toUpperCase()
                }</span>
        },
        {
            accessorKey: "actions",
            header: (device == deviceTypes.mobile)? "Act.": "Acciones",
            enableSorting: false,
            cell: (info) => <ContentActionsTable
                funcEdit={() => editItem(info.row.original)}
                funcDelete={() => deleteItem(info.row.original)}
            />
        },
    ]

    /* custom columns */
    const customColumns = tableColumns.map(item => ({ accessorKey: item.accessorKey, responsive: '' }))
    //customColumns[1].responsive = 'hidden sm:block'
    //customColumns[0].responsive = 'hidden bg-red-500 w-[80px]'
    customColumns[2].responsive = ''


    return (
        <TableGeneric
            data={data ?? []}
            columns={tableColumns}
            customColumns={customColumns}
            actionRegister={(action, data) => actionRegister(action, data)}
        />
    )
}
