"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/app/app-data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/chakra-checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/sdcn-dropdown-menu";
import { IAcademicDepartment } from "@/data/interface/IAcademicDepartment";
import apiHandler from "@/data/api/ApiHandler";
import { toaster } from "@/components/ui/chakra-toaster";
import { Button } from "@chakra-ui/react";

export const getColumns = (reloadData: () => void): ColumnDef<IAcademicDepartment>[] => [
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
    accessorKey: "facultyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Faculty" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "sessionName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session" />
    ),
  },
  {
    accessorKey: "totalStudent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No. of Student" />
    ),
  },
  {
    accessorKey: "totalBill",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Bill" />
    ),
    cell: ({ row }) => {
      const value = row.original;
      const formattedNaira = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      }).format(value.totalBill);

      return <span className="text-xs font-semibold">{formattedNaira}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const value = row.original;

      const handleBillCommit = () => {
        const promise = apiHandler.transactions
          .generate_and_commit_bill(value.code as string)
          .then(() => {
            value.isCommited = true;
            reloadData(); // refresh table after commit
          });

        toaster.promise(promise, {
          success: {
            title: `${value.name} Bill committed successfully`,
            description: "Looks great",
          },
          error: {
            title: "Failed to commit bill",
            description: "Something wrong with the commit",
          },
          loading: { title: "Committing...", description: "Please wait" },
        });
      };

      return (
        <Button
          onClick={handleBillCommit}
          disabled={value.isCommited}
          className="bg-primary my-1 rounded-sm"
          size="xs"
        >
          Commit Bill
        </Button>
      );
    },
    size: 1,
  },
];
