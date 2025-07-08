"use client";

import { DataTableColumnHeader } from "@/components/app/app-data-table/data-table-column-header";
import AppDataList from "@/components/ui/app-data-list";
import { Progress } from "@/components/ui/sdcn-progress";
import { IReviewInProgress } from "@/data/interface/IReviewInProgress";
import { Badge, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

export const submissionColumns = (reloadData: () => void): ColumnDef<{
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
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
    },
    {
      id: "reviewers",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Reviewers" />
      ),
      cell: ({ row }) => {
        const value = row.original;
        // Assuming value.reviewers is an array of reviewer objects with name and feedback
        // and AppDataList takes items: { label: string, description?: string }[]
        // You may need to adjust the mapping based on your actual data structure
        return (
          <AppDataList
            data={
              value.reviewers?.map((reviewer: any) => ({
                label: reviewer.name,
                value: reviewer.hasFeedback ? <Badge colorPalette='green'>Feedback added</Badge> : <Badge colorPalette='red'>No feedback</Badge>
              })) || []
            }
            orientation="horizontal"
            gap="0"
          />
        );
      },
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
              Continue
            </Button>
          </HStack>
        );
      },
      size: 1,
    },
  ];
