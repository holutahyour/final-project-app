"use client";

import { DataTableColumnHeader } from "@/components/app/app-data-table/data-table-column-header";
import { IUser } from "@/data/interface/IUser";
import { Button, HStack, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (reloadData: () => void): ColumnDef<IUser>[] => [
  {
    id: "sn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="S/N" />
    ),
    cell: ({ row }) => {
      const value = row.original;

      return (<Text>{row.index + 1}</Text>);
    },
    size: 1,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Address" />
    ),
  },
  {
    accessorKey: "faculty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Faculty" />
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const value = row.original;

      return (
        <HStack justifyContent="center" width="100%">
          <Button
            className="bg-primary my-1 rounded-sm font-semibold"
            size="xs"
            width='24'
          >
            Continue
          </Button>
        </HStack>
      );
    },
    size: 1,
  },
];
