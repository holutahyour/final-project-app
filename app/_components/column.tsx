"use client";

import { DataTableColumnHeader } from "@/components/app/app-data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/chakra-checkbox";
import { Progress } from "@/components/ui/sdcn-progress";
import { IReviewInProgress } from "@/data/interface/IReviewInProgress";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (reloadData: () => void): ColumnDef<IReviewInProgress>[] => [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "lastOpened",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Opened" />
    ),
    cell: ({ row }) => {
      const value = row.original;

      return (
        <p>
          {new Date(value.lastOpened).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      );
    },
  },
  {
    id: "progress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Progress" />
    ),
    cell: ({ row }) => {
      const value = row.original;

      return (
        <Stack>
          <Text textAlign='left'>20% completed</Text>
          <Progress value={33} />
        </Stack>
      );
    },
    size: 100,
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
