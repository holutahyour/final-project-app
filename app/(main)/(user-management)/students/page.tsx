"use client";

import AppCombobox from "@/components/app/app-chakra-combo-box";
import AppDataTable from "@/components/app/app-data-table";
import AppEmptyState from "@/components/app/app-empty-state";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER } from "@/lib/routes";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { useCallback, useLayoutEffect, useState } from "react";
import { getColumns } from "./_components/column";
import Profile from "./profile/profile";

export default function Page() {
  const { router, searchParams } = useQuery(APP_DRAWER, "true");

  const [students, setStudents] = useState<{
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
  }[]>([])
  const [tableLoader, setTableLoader] = useState<boolean>(false);


  const reloadData = useCallback(async () => {
    setTableLoader(true);

    const fetched = await getStudents();
    setStudents(fetched);
    setTableLoader(false);

  }, []);

  useLayoutEffect(() => {
    reloadData()
  }, [reloadData]);

  const viewProfileUrl = useModifyQuery(
    null,
    searchParams,
    [{ key: APP_DRAWER, value: "true" }],
    "set"
  );

  const handleReviewDetail = () => {
    //setSelectedErpSetting(erpSetting);
    router.push(`${viewProfileUrl}`);
    //console.log("Selected Erp Setting:", erpSetting);
  };

  const modifiedColumns = getColumns(reloadData).map((column) => {
    if (column.id === "actions") {
      return {
        ...column,
        cell: ({ row }: any) => {
          const value = row.original;

          return (
            <HStack justifyContent="center" width="100%">
              <Button
                className="bg-primary my-1 rounded-sm font-semibold"
                size="xs"
                width='24'
                onClick={() => {
                  router.push(`${viewProfileUrl}&id=${value.id}`);
                }}
              >
                View Detail
              </Button>
            </HStack>
          );
        },
      };
    }
    return column;
  });


  return <Stack className="pb-6">
    {students.length === 0 ? <AppEmptyState
      heading="Nothing here yet!"
      description="Submitted articles would appear here"
    /> :
      <AppDataTable
        loading={tableLoader}
        columns={modifiedColumns}
        data={students}
        titleElement={
          <Stack direction={{ base: "column", md: "row" }} gap={4}>
            <AppCombobox label="Faculty" data={frameworks} size="xs" />
            <AppCombobox label="Department" data={frameworks} size="xs" />
          </Stack>}
      />}
      <Profile />
  </Stack>;
}

export async function getStudents() {
  return [
    {
      id: 1,
      studentName: "Alice Johnson",
      title: "AI in Modern Education",
      status: "Under Review",
      reviewers: [
        { name: "Dr. Smith", hasFeedback: true },
        { name: "Dr. Lee", hasFeedback: false },
      ],
      lastOpened: "2024-06-01T12:00:00Z",
      progress: "50%",
      submittedAt: new Date("2024-05-01T10:00:00Z"),
    },
    {
      id: 2,
      studentName: "Bob Williams",
      title: "Quantum Computing Basics",
      status: "Awaiting Review",
      reviewers: [
        { name: "Prof. Adams", hasFeedback: false },
      ],
      lastOpened: "2024-06-02T14:30:00Z",
      progress: "30%",
      submittedAt: new Date("2024-05-10T09:30:00Z"),
    },
    {
      id: 3,
      studentName: "Carol Smith",
      title: "Topology and Its Applications",
      status: "Awaiting Revision",
      reviewers: [
        { name: "Dr. Brown", hasFeedback: true },
        { name: "Prof. Adams", hasFeedback: true },
      ],
      lastOpened: "2024-06-03T16:45:00Z",
      progress: "80%",
      submittedAt: new Date("2024-05-15T11:15:00Z"),
    },
    {
      id: 4,
      studentName: "David Lee",
      title: "Blockchain Security",
      status: "In Progress",
      reviewers: [
        { name: "Dr. White", hasFeedback: false },
      ],
      lastOpened: "2024-06-04T09:20:00Z",
      progress: "60%",
      submittedAt: new Date("2024-05-20T13:00:00Z"),
    },
  ];
}

export async function getStudentById(id: string | number) {
  const students = await getStudents();
  return students.find((submission) => submission.id == id) || null;
}

export const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Preact", value: "preact" },
  { label: "Qwik", value: "qwik" },
  { label: "Lit", value: "lit" },
  { label: "Alpine.js", value: "alpinejs" },
  { label: "Ember", value: "ember" },
  { label: "Next.js", value: "nextjs" },
]
