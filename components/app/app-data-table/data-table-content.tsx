import { Table } from "@tanstack/react-table"

import {
    Table as SdcnTable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/sdcn-table"
import { useRef } from "react"
import AppLoader from "../app-loader"
import AppEmptyState from "../app-empty-state"

interface DataTableContentProps<TData> {
    table: Table<TData>
    flexRender: any,
    columns: any,
    loading: boolean
}

function DataTableContent<TData>({
    table,
    flexRender,
    columns,
    loading
}: DataTableContentProps<TData>) {
    const parentRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={parentRef} className="rounded-md border-none overflow-clip">
            <SdcnTable className="text-xs">
                <TableHeader className="bg-primary/20">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="border-none">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="px-2 py-0 font-bold"
                                        {...{
                                            colSpan: header.colSpan,
                                            style: {
                                                width: header.getSize(),
                                            },
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="px-2 py-3 min-w-fit font-semibold"
                                        {...{
                                            style: {
                                                width: cell.column.getSize(),
                                            },
                                        }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            {loading ? (<TableCell colSpan={columns.length} className="h-96 text-center">
                                <AppLoader size="sm" />
                            </TableCell>)
                                :
                                (<TableCell colSpan={columns.length} className="h-96 text-center">
                                    <AppEmptyState heading='Start adding question' description='Add a new question to get started' />
                                </TableCell>)}
                        </TableRow>
                    )}
                </TableBody>
            </SdcnTable>
        </div>
    )
}

export default DataTableContent