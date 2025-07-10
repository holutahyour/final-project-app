"use client";

import { DataTableColumnHeader } from "@/components/app/app-data-table/data-table-column-header";
import { Badge, Button, HStack, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (reloadData: () => void): ColumnDef<{
  id: number;
  studentName: string;
  title: string;
  status: string;
  reviewers: {
    name: string;
    hasFeedback: boolean;
  }[];
  lastOpened: string;
  progress: string;
  submittedAt: Date;
}>[] => [
    {
      id: "sn",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="S/N" />
      ),
      cell: ({ row }) => {
        const value = row.original;

      },
      size: 1,
    },
    {
      accessorKey: "studentName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Student Name" />
      ),
    },
    {
      accessorKey: "linkedSubmission",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Submitted Article" />
      ),
    },
    {
      id: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const value = row.original;

        return (
          <Badge
            colorPalette={
              value.status === "Awaiting Review"
                ? "red"
                : value.status === "Under Review"
                  ? "green"
                  : value.status === "Awaiting Revision"
                    ? "orange"
                    : value.status === "In Progress"
                      ? "yellow"
                      : "gray"
            }
            className="text-xs font-semibold">
            <Text className="capitalize">{value.status}</Text>
          </Badge>
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
              Join Deliberation
            </Button>
          </HStack>
        );
      },
      size: 1,
    },
  ];
