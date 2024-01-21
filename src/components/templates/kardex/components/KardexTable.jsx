import styled from "styled-components"
import { useUserStore } from "../../../../store/UserStore"
import { Device } from "../../../../styles/breakpoints"
import { APP_CONFIG } from "../../../../utils/dataEstatica"
import { modalAlert } from "../../../../utils/modalAlert"
import { ContentActionsTable } from "../../../organismos/table/ContentActionsTable"
import { TableGeneric } from "../../../organismos/table/TableGeneric"


export const KardexTable = ({
    data,
    actionRegister,
}) => {
    const deleteUser = useUserStore((state) => state.delete)

    const editItem = (item) => {
        if (item.type_user.trim() == APP_CONFIG.type_user.admin) {
            modalAlert({ type: 'warning', text: 'No se puede modificar usuario superadmin.' })
            return
        }
        actionRegister(APP_CONFIG.actionCrud.update, item)
    }

    const deleteItem = (item) => {
        if (item.type_user.trim() == APP_CONFIG.type_user.admin) {
            modalAlert({ type: 'warning', text: 'No se puede eliminar usuario admin.' })
            return
        }
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
                    {info.getValue().toUpperCase()}
                </Colorcontent>
        },
        {
            accessorKey: "quantity",
            header: "Cant",
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "detail",
            header: "Detalle",
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "product_stock",
            header: "Stock",
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


    return (
        <TableGeneric
            data={data ?? []}
            columns={tableColumns}
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