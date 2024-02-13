import { useState, useEffect } from "react"
import { useProductStore } from "../../../../store/ProductStore"
import { APP_CONFIG } from "../../../../utils/dataEstatica"
import { modalAlert } from "../../../../utils/modalAlert"
import { ContentActionsTable } from "../../../organismos/table/ContentActionsTable"
import { TableGeneric } from "../../../organismos/table/TableGeneric"
import { getDeviceType } from "../../../../utils/deviceType"
import { deviceTypes } from "../../../../styles/breakpoints"


export const Table = ({
    data,
    actionRegister,
}) => {
    const deleteProduct = useProductStore((state) => state.delete)
    const [device, setDevice] = useState(0)

    useEffect(()=>{
        setDevice(getDeviceType())
    }, [])


    const editItem = (item) => {
        // if (item.type_product.trim() == APP_CONFIG.type_product.admin) {
        //     modalAlert({ type: 'warning', text: 'No se puede modificar usuario superadmin.' })
        //     return
        // }
        actionRegister({ action: APP_CONFIG.actionCrud.update, data: item })
    }

    const deleteItem = (item) => {
        // if (item.type_product.trim() == APP_CONFIG.type_product.admin) {
        //     modalAlert({ type: 'warning', text: 'No se puede eliminar usuario admin.' })
        //     return
        // }
        modalAlert({ type: 'delete' })
            .then(async (result) => {
                if (result.isConfirmed) {
                    if (await deleteProduct({ id: item.id }))
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
            accessorKey: "stock",
            header: "Stock",
            enableSorting: false,
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "price_sale",
            header: (device == deviceTypes.mobile)? "P.Vta.": "P.Venta",
            enableSorting: false,
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "price_buy",
            header: "P.Compra",
            enableSorting: false,
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "description_category",
            header: "Categoría",
            cell: (info) => <span style={{ color: `${info.row.original.description_category}` }}>{info.getValue()}</span>
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
     customColumns[3].responsive = 'hidden sm:block'
     customColumns[4].responsive = 'hidden sm:block'


    return (
        <TableGeneric
            data={data ?? []}
            columns={tableColumns}
            customColumns={customColumns}
            actionRegister={(action, data) => actionRegister(action, data)}
        />
    )
}
