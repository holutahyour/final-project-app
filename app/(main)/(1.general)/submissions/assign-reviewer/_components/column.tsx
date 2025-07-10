"use client";

import { DataTableColumnHeader } from "@/components/app/app-data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/chakra-checkbox";
import { Progress } from "@/components/ui/sdcn-progress";
import { IReviewInProgress } from "@/data/interface/IReviewInProgress";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (reloadData: () => void): ColumnDef<{
  id: number;
  name: string;
  department: string;
  expertise: string;
  assignments: number;
  status: string;
}>[] => [
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Reviewer" />
      ),
    },
    {
      accessorKey: "department",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Department" />
      ),
    },
    {
      accessorKey: "expertise",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Area of expertise" />
      ),
    },
    {
      accessorKey: "assignments",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assignments" />
      ),
    },
  ];
