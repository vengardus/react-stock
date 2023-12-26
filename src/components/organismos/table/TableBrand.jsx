import { flexRender } from "@tanstack/react-table"
import {
    // Column,
    // Table,
    useReactTable,
    // ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    // getFacetedRowModel,
    // getFacetedUniqueValues,
    // getFacetedMinMaxValues,
    getPaginationRowModel,
    // sortingFns,
    getSortedRowModel,
    // FilterFn,
    // SortingFn,
    // ColumnDef,
    // flexRender,
    // FilterFns,
} from "@tanstack/react-table"
import { ContentActionsTable } from "./ContentActionsTable"


export const TableBrand = ({
    data
}) => {
    const editIten = (parm) => {
        console.log('edit',parm)
    }

    const deleteItem = () => {
        console.log('delete')
    }

    const columns = [
        {
            accessorKey: "description",
            header: "Descripción",
            cell: (info) => <span>{info.getValue()}</span>
        },
        {
            accessorKey: "actions",
            header: "Acciones",
            cell: (info) => <ContentActionsTable
                funcEdit={() => editIten(info.row.original)}
                funcDelete={() => deleteItem(info.row.original)}
            />
        },

    ]
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })



    return (
        <div>
            <table>
                <thead>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => (
                                        <th key={header.id}>{header.column.columnDef.header}</th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(item => (
                            <tr key={item.id}>
                                {
                                    item.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
