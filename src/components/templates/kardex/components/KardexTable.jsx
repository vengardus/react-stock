import { useState, useEffect } from "react"
import styled from "styled-components"
import { Device } from "../../../../styles/breakpoints"
import { APP_CONFIG } from "../../../../utils/dataEstatica"
import { modalAlert } from "../../../../utils/modalAlert"
import { ContentActionsTable } from "../../../organismos/table/ContentActionsTable"
import { TableGeneric } from "../../../organismos/table/TableGeneric"
import { useKardexStore } from "../../../../store/KardexStore"
import { getDeviceType } from "../../../../utils/deviceType"
import { deviceTypes } from "../../../../styles/breakpoints"

export const KardexTable = ({
    data,
    actionRegister,
}) => {
    const deleteKardex = useKardexStore((state) => state.delete)
    const [device, setDevice] = useState('')

    useEffect(() => {
        setDevice(getDeviceType())
    }, [])


    const editItem = (item) => {
        item
        // if (item.type_user.trim() == APP_CONFIG.type_user.admin) {
        modalAlert({ type: 'warning', text: 'No se puede modificar movimiento.' })
        //     return
        // }
        // actionRegister(APP_CONFIG.actionCrud.update, item)
    }

    const deleteItem = (item) => {
        if (item.state === 0) {
            modalAlert({ type: 'warning', text: 'No se puede eliminar movimiento.' })
            return
        }
        modalAlert({ type: 'delete' })
            .then(async (result) => {
                if (result.isConfirmed) {
                    if (await deleteKardex({ id: item.id }))
                        modalAlert({ type: 'infoTimer', text: 'Se eliminó registro.' })
                    else
                        modalAlert({ type: 'warning', text: 'Error al eliminar registro.' })
                }
            });
    }

    const tableColumns = [
        {
            accessorKey: "date",
            header: "Fecha",
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "product_description",
            header: "Producto",
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "type",
            header: "Tipo",
            cell: (info) =>
                <Colorcontent
                    $color={info.getValue() == APP_CONFIG.movementType.outgoing
                        ? "#ed4d4d" : "#30c85b"}
                >
                    { info.getValue().toUpperCase() }
                </Colorcontent>,
            enableSorting: false,
        },
        {
            header: "Cant/ Stock",
            accessorKey: "quantity_stock",
            cell: (info) => <span className="flex flex-col gap-y-2 text-center">
                <div className={ `${(info.row.original.type == APP_CONFIG.movementType.outgoing)? 'text-[#ed4d4d]':'text-[#30C85B] '}`  }>
                    {info.row.original.quantity} 
                </div>
                <div className="">({info.row.original.product_stock}) </div>
            </span>,
            enableSorting: false,
        },
        {
            header: "Cant",
            accessorKey: "quantity",
            cell: (info) => <span className=''>
                {info.getValue()}
            </span>,
            enableSorting: false,
        },
        {
            accessorKey: "detail",
            header: "Detalle",
            cell: (info) => <span className={!info.row.original.state ? 'text-red-500' : ''}>
                {(info.row.original.state ? '' : 'ANULADO: ') + info.getValue()}</span>
        },
        {
            accessorKey: "product_stock",
            header: "Stock",
            cell: (info) => <span>{info.getValue()}</span>,
            enableSorting: false,
        },
        {
            accessorKey: "actions",
            header: (device == deviceTypes.mobile || device == deviceTypes.tablet)? "Act." : "Acciones",
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
    
    customColumns[0].responsive = 'w-3/12 sm:w-2/12 '                   //  date
    customColumns[1].responsive = 'w-5/12 md:w-3/12 lg:w-4/12'         // description
    customColumns[2].responsive = 'hidden sm:block w-2/12'   // type
    customColumns[3].responsive = 'md:hidden w-2/12 md:w-1/12'                  // quantity / stpck
    customColumns[4].responsive = 'hidden w-1/12 md:block md:w-2/12 '  // quantity
    customColumns[5].responsive = 'hidden w-2/12 lg:block'               // detail
    customColumns[6].responsive = 'hidden w-1/12 md:block  md:w-2/12'      // stock
    customColumns[7].responsive = ' w-2/12 md:block'  // actions


    return (
        <TableGeneric
            data={data ?? []}
            columns={tableColumns}
            customColumns={customColumns}
            actionRegister={(action, data) => actionRegister(action, data)}
        />
    )
}

const Colorcontent = styled.div`
  color: ${(props) => props.$color};
  border-radius: 8px;
  border:1px dashed ${(props) => props.$color};
  text-align: center;
  padding:3px;
  width:70%;
  font-weight:700;
  @media ${Device.tablet} {
    width:100%;
  }
`