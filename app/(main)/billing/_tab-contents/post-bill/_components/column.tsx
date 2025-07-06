"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/app/app-data-table/data-table-column-header"
import { Checkbox } from "@/components/ui/chakra-checkbox"
import { ITransactionBatch } from "@/data/interface/ITransactionBatch"
import { Badge, Button, Icon } from "@chakra-ui/react"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { CircleDashed } from "lucide-react"
import apiHandler from "@/data/api/ApiHandler"
import { toaster } from "@/components/ui/chakra-toaster"


export const columns: ColumnDef<ITransactionBatch>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 1,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "batchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Batch Name" />
    ),
  },
  {
    accessorKey: "academicFacultyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Faculty" />
    ),
  },
  {
    accessorKey: "academicDepartmentName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
  },
  {
    accessorKey: "sessionName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session" />
    ),
  },
  {
    accessorKey: "totalEntries",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Entries" />
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => {
      const value = row.original;

      const formattedNaira = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      }).format(value.totalAmount);

            return <span className="text-xs font-semibold">{formattedNaira}</span>
        }
    },
    {
        accessorKey: "synch",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Synced To Erp" />
        ),
        cell: ({ row }) => {
            const value = row.original

            return value.synch ? (<Badge fontWeight='semibold' colorPalette="green"><CheckCircledIcon /> Synced</Badge>) : (<Badge fontWeight='semibold' colorPalette="yellow"><Icon size='sm'><CircleDashed /></Icon> Pending</Badge>)
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const ActionCell = () => {
                const value = row.original

                const handlePostBill = () => {
                    var promise = apiHandler.erp.post_invoices(value.code as string)
                        .then((response) => {
                            value.synch = true;
                        })

                    toaster.promise(promise, {
                        success: {
                            title: `${value.batchName} Bill committed successfully`,
                            description: "Looks great",
                        },
                        error: {
                            title: "Failed to commit bill",
                            description: "Something wrong with the commit",
                        },
                        loading: { title: "committing...", description: "Please wait" },
                    })
                }

                return (
                    <Button onClick={handlePostBill} disabled={value.synch} colorPalette='green' className="my-1 rounded-sm" size='xs'>
                        Post Bill
                    </Button>
                )
            }

            return <ActionCell />
        },
        size: 1,
    },
]
