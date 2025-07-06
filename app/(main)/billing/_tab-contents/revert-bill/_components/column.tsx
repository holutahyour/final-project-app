"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/chakra-checkbox";
import { DataTableColumnHeader } from "@/components/app/app-data-table/data-table-column-header";
import { ITransactionBatch } from "@/data/interface/ITransactionBatch";
import { Badge, Button, Icon } from "@chakra-ui/react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { CircleDashed } from "lucide-react";

import apiHandler from "@/data/api/ApiHandler";
import { toaster } from "@/components/ui/chakra-toaster";

export function getColumns(reloadData: () => void): ColumnDef<ITransactionBatch>[] {
  return [
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
        const formattedNaira = new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
          minimumFractionDigits: 2,
        }).format(row.original.totalAmount);

        return <span className="text-xs font-semibold">{formattedNaira}</span>;
      },
    },
    {
      accessorKey: "synch",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Synced To ERP" />
      ),
      cell: ({ row }) => {
        const isSynced = row.original.synch;

        return isSynced ? (
          <Badge fontWeight="semibold" colorScheme="green">
            <CheckCircledIcon /> Synced
          </Badge>
        ) : (
          <Badge fontWeight="semibold" colorScheme="yellow">
            <Icon as={CircleDashed} boxSize={4} mr={1} />
            Pending
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const value = row.original;

        const handleRevertBill = () => {
          const promise = apiHandler.erp
            .revert_invoice([value.code])
            .then(() => {
              value.synch = false;
              reloadData(); // 🔁 Reload table after revert
            });

          toaster.promise(promise, {
            success: {
              title: `${value.batchName} Bill reverted successfully`,
              description: "The bill has been removed from ERP.",
            },
            error: {
              title: "Failed to revert bill",
              description: "Could not delete bill from ERP.",
            },
            loading: {
              title: "Reverting...",
              description: "Please wait while the bill is being reverted.",
            },
          });
        };

        return (
          <Button
            onClick={handleRevertBill}
            disabled={value.synch}
            colorScheme="orange"
            size="xs"
            colorPalette="orange"
            className="my-1 rounded-sm"
          >
            Revert Bill
          </Button>
        );
      },
      size: 1,
    },
  ];
}
