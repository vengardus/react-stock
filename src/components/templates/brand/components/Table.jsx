import { useBrandStore } from "../../../../store/BrandStore"
import { APP_CONFIG } from "../../../../utils/dataEstatica"
import { modalAlert } from "../../../../utils/modalAlert"
import { ContentActionsTable } from "../../../organismos/table/ContentActionsTable"
import { TableGeneric } from "../../../organismos/table/TableGeneric"


export const Table = ({
    data,
    actionRegister,
}) => {
    const deleteBrand = useBrandStore((state) => state.delete)

    const editItem = (item) => {
        // if (item.type_brand.trim() == APP_CONFIG.type_brand.admin) {
        //     modalAlert({ type: 'warning', text: 'No se puede modificar usuario superadmin.' })
        //     return
        // }
        actionRegister({action:APP_CONFIG.actionCrud.update, data:item})
    }
    
    const deleteItem = (item) => {
        // if (item.type_brand.trim() == APP_CONFIG.type_brand.admin) {
        //     modalAlert({ type: 'warning', text: 'No se puede eliminar usuario admin.' })
        //     return
        // }
        modalAlert({ type: 'delete' })
            .then(async (result) => {
                if (result.isConfirmed) {
                    if (await deleteBrand({ id: item.id }))
                        modalAlert({ type: 'infoTimer', text: 'Se eliminó registro.' })
                    else
                        modalAlert({ type: 'warning', text: 'Error al eliminar registro.' })
                }
            });
    }
    
    const tableColumns = [
        {
            accessorKey: "description",
            header: "Descripción",
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "actions",
            header: "Acciones",
            enableSorting: false,
            cell: (info) => <ContentActionsTable
                funcEdit={() => editItem(info.row.original)}
                funcDelete={() => deleteItem(info.row.original)}
            />
        },
    ]

    /* custom columns */
    const customColumns = tableColumns.map(item => ({ accessorKey: item.accessorKey, responsive: '' }))
    //customColumns[3].responsive = 'hidden sm:block'
    

    return (
        <TableGeneric
            data={data ?? []}
            columns={tableColumns}
            customColumns={customColumns}
            actionRegister={(action, data) => actionRegister(action, data)}
        />
    )
}
