"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table"



import { Input } from "@/components/ui/sdcn-input"

import { Card, CardContent } from "@/components/ui/sdcn-card"
import { useQuery } from "@/hooks/use-query"
import { APP_DEFAULT_PAGE, APP_DRAWER } from "@/lib/routes"
import { handleExport } from "@/lib/utils"
import { Button, Heading, HStack, Separator, Stack } from "@chakra-ui/react"
import { Banknote } from "lucide-react"
import React, { useState } from "react"
import { LuArrowRight } from "react-icons/lu"
import DataTableContent from "./data-table-content"
import DataTableETL from "./data-table-etl"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableViewOptions } from "./data-table-view-option"

type FilterConfig<T> = {
    key: keyof T;
    placeholder: string;
  };

interface AppDataTableProps<TData, TValue> {
    filters?: FilterConfig<TData>[];
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    title?: string,
    titleElement?: React.ReactNode,
    filter?: string,
    filterPlaceholder?: string,
    loading: boolean,
    redirectUri?: string,
    drawerUrl?: string,
    fillterElement?: React.ReactNode,
    onImport?: ((file: File[]) => Promise<void>) | ((file: File[]) => void),

}

export default function AppDataTable<TData, TValue>({
    columns,
    data,
    title,
    titleElement,
    filter,
    filterPlaceholder,
    loading,
    redirectUri,
    drawerUrl,
    onImport,
    fillterElement
}: AppDataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState('') 
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            globalFilter,
            columnVisibility,
            rowSelection,
        },
        defaultColumn: {
            size: 150,
            minSize: 1,
            maxSize: Number.MAX_SAFE_INTEGER,
        },
    })

    return (
        <Card className="min-w-fit">
            <CardContent className="pt-6 p-5">
                <Stack>
                    <AppDataTableHeader
                        table={table}
                        title={title}
                        titleElement={titleElement}
                        filter={filter}
                        filterPlaceholder={filterPlaceholder}
                        fillterElement={fillterElement}
                        loading={loading}
                        onExport={() => handleExport<TData[]>(data ?? [], title as string)}
                        redirectUri={redirectUri ?? APP_DEFAULT_PAGE()}
                        drawerUrl={drawerUrl}
                        onImport={onImport}
                    />

                    <DataTableContent
                        loading={loading}
                        table={table}
                        flexRender={flexRender}
                        columns={columns}
                    />

                    <DataTablePagination table={table} />
                </Stack>
            </CardContent>
        </Card>
    )
}

interface AppDataTableHeaderProps<TData> {
    table: Table<TData>,
    data?: TData[],
    title?: string,
    titleElement?: React.ReactNode,
    filter?: string,
    filterPlaceholder?: string,
    onImport?: ((file: File[]) => Promise<void>) | ((file: File[]) => void),
    onDownload?: (() => Promise<void>) | (() => void),
    onExport?: (() => Promise<void>) | (() => void),
    loading: boolean,
    redirectUri: string,
    drawerUrl?: string,
    fillterElement: React.ReactNode
}

function AppDataTableHeader<TData>({
    table,
    data,
    title,
    filter,
    filterPlaceholder,
    onImport,
    onDownload,
    onExport,
    loading,
    redirectUri,
    drawerUrl,
    titleElement,
    fillterElement,
}: AppDataTableHeaderProps<TData>) {
    return (
        <HStack justifyContent='space-between' pb='6'>
            <AppDataTableLabel title={title} titleElement={titleElement} />
            <AppDataTableFilter
                table={table}
                title={title}
                filter={filter}
                filterPlaceholder={filterPlaceholder}
                fillterElement={fillterElement}
                loading={loading}
                onImport={onImport}
                onExport={onExport}
                redirectUri={redirectUri}
                drawerUrl={drawerUrl}
            />

        </HStack>
    )
}

function AppDataTableLabel({ title, titleElement }: { title?: string, titleElement: React.ReactNode }) {
    return (
        titleElement ?? (<HStack align="center" alignContent='center' gap='5'>
            <HStack align="center" alignContent='center'>
                <Banknote />
                <Heading className="" size="lg" fontWeight='bold'>{title ?? "Table"}</Heading>
            </HStack>
        </HStack>)
    )
}

function AppDataTableFilter<TData>({
  table,
  title,
  filter,
  filterPlaceholder,
  onImport,
  onDownload,
  onExport,
  loading,
  drawerUrl,
  fillterElement,
}: AppDataTableHeaderProps<TData>) {
  const { router, searchParams, open } = useQuery(APP_DRAWER, 'true');

  return (
    <HStack align="center" alignContent='center' gap={4}>
      {/* Global Filter Input */}
      {filterPlaceholder && <Input
        placeholder={filterPlaceholder}
        value={(table.getState().globalFilter as string) ?? ""}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        className="max-w-sm"
      />}

      {/* ETL Buttons (Import/Export) - Always show if onImport is provided */}
      {onImport && (
        <DataTableETL 
          table={table} 
          onImport={onImport} 
          onDownload={onDownload} 
          onExport={onExport} 
          loading={loading} 
        />
      )}

      <DataTableViewOptions table={table} />
      
      {/* Optional drawer button */}
      {drawerUrl && (
        <>
          <Separator variant="solid" borderColor='gray.700' orientation='vertical' height="6" />
          <Button
            onClick={() => router.push(drawerUrl)}
            size="xs"
            colorScheme="primary"
      
          >
            Import {title} <LuArrowRight />
          </Button>
        </>
      )}
      
      {fillterElement && fillterElement}
    </HStack>
  )
}