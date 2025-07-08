"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/app/app-data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/chakra-checkbox";
import { Button } from "@/components/ui/sdcn-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/sdcn-dropdown-menu";
import { IFeePayment } from "@/data/interface/IFeePayment";
import { CircleDashed, CircleX, MoreHorizontal } from "lucide-react";
import { Badge, Icon } from "@chakra-ui/react";
import { CheckCircledIcon } from "@radix-ui/react-icons";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<IFeePayment>[] = [
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
    accessorKey: "studentCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student Code" />
    ),
  },
  {
    accessorKey: "transactionReference",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction Reference" />
    ),
  },
  {
    accessorKey: "invoiceNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice Number" />
    ),
  },
  {
    accessorKey: "departmentName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
  },
  {
    accessorKey: "programName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Date" />
    ),
    cell: ({ row }) => {
      const value = row.original;

      return (
        <p>
          {new Date(value.paymentDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "bankCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bank Code" />
    ),
  },
  {
    accessorKey: "posted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posted to Erp" />
    ),
    cell: ({ row }) => {
      const value = row.original;

      return value.posted ? (
        <Badge fontWeight="semibold" colorPalette="green">
          <CheckCircledIcon /> Posted
        </Badge>
      ) : (
        <Badge fontWeight="semibold" colorPalette="yellow">
          <Icon size="sm">
            <CircleDashed />
          </Icon>{" "}
          Pending
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const value = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(value.id.toString())}
            >
              Copy Fee Schedule ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Fee Schedule</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 1,
  },
];
