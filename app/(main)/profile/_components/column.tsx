"use client";

import { DataTableColumnHeader } from "@/components/app/app-data-table/data-table-column-header";
import { Progress } from "@/components/ui/sdcn-progress";
import { IReviewInProgress } from "@/data/interface/IReviewInProgress";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

export const submissionColumns = (reloadData: () => void): ColumnDef<IReviewInProgress>[] => [
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
