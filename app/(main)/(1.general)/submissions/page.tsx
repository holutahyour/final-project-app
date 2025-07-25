"use client";

import { useRoleSelection } from "@/app/context/roleSelection-context";
import AppDataTable from "@/components/app/app-data-table";
import AppEmptyState from "@/components/app/app-empty-state";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER, ASSIGN_REVIEWER, REVISIONS } from "@/lib/routes";
import { Button, HStack, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { useCallback, useLayoutEffect, useState } from "react";
import { submissionColumns } from "./_components/column";
import ReviewArticle from "./review-document/review-article";
import AppCombobox from "@/components/app/app-chakra-combo-box";

export default function Page() {
  const { router, searchParams } = useQuery(APP_DRAWER, "true");

  const [submissions, setSubmissions] = useState<[]>([])
  const [tableLoader, setTableLoader] = useState<boolean>(false);

  const { selectedRole } = useRoleSelection();

  const reloadData = useCallback(async () => {
    setTableLoader(true);

    const fetched = await getArticleSubmissions();
    setSubmissions(fetched);
    setTableLoader(false);

  }, []);

  useLayoutEffect(() => {
    reloadData()
  }, [reloadData]);

  const createSubmissionUrl = useModifyQuery(
    null,
    searchParams,
    [{ key: APP_DRAWER, value: "true" }],
    "set"
  );

  const handleCreateSubmission = () => {
    //setSelectedErpSetting(erpSetting);
    router.push(`${createSubmissionUrl}`);
    //console.log("Selected Erp Setting:", erpSetting);
  };

  const modifiedColumns = submissionColumns(reloadData).map((column) => {
    if (column.id === "actions") {
      return {
        ...column,
        cell: ({ row }: any) => {
          const value = row.original;

          return (
            <HStack justifyContent="center" width="100%">
              <Link href={`${REVISIONS}?id=${value.id}`}>
                <Button
                  className="bg-primary my-1 rounded-sm font-semibold"
                  size="xs"
                >
                  View Revisions
                </Button>
              </Link>

              {selectedRole === "reviewer" && (<Button
                className="bg-primary my-1 rounded-sm font-semibold"
                size="xs"
                width='24'
                onClick={() => {
                  router.push(`${createSubmissionUrl}&id=${value.id}`);
                }}
              >
                Review
              </Button>)}
              {selectedRole === "Admin" && (<Button
                className="bg-primary my-1 rounded-sm font-semibold"
                size="xs"
                onClick={() => {
                  router.push(`${ASSIGN_REVIEWER}?id=${value.id}`);
                }}
              >
                Assign Reviewer
              </Button>)}
            </HStack>

          );
        },
      };
    }
    return column;
  });


  return <Stack>
    {submissions.length === 0 ? <AppEmptyState
      heading="Nothing here yet!"
      description="Articles You submit would appear here"
      primaryButtonText="Submit an Article"
      onPrimaryButtonClick={handleCreateSubmission}
    /> :
      <AppDataTable
        loading={tableLoader}
        columns={modifiedColumns}
        data={submissions}
        titleElement={<Stack direction={{ base: "column", md: "row" }} gap={4}>
          {selectedRole === "board-members" && (
            <>
              <AppCombobox label="Faculty" data={frameworks} size="xs" />
              <AppCombobox label="Department" data={frameworks} size="xs" />
            </>
          )}
          <AppCombobox label="Status" data={frameworks} size="xs" />
        </Stack>}
      // filter="accountName"
      // filterPlaceholder="Filter account names..."
      />}
    <ReviewArticle />
  </Stack>;
}


export async function getArticleSubmissions() {
  //const Info = await apiHandler.students.list();
  return [
    {
      id: 1,
      code: "REV-001",
      title: "AI in Modern Education",
      lastOpened: "2024-06-01T12:00:00Z",
      progress: "50%",
      status: "In Progress",
      submittedAt: new Date("2024-05-01T10:00:00Z"),
      reviewer: "Dr. Smith",
    },
    {
      id: 2,
      code: "REV-002",
      title: "Quantum Computing Basics",
      lastOpened: "2024-06-02T14:30:00Z",
      progress: "30%",
      status: "In Progress",
      submittedAt: new Date("2024-05-10T09:30:00Z"),
      reviewer: "Prof. Adams",
    },
    {
      id: 3,
      code: "REV-003",
      title: "Topology and Its Applications",
      lastOpened: "2024-06-03T16:45:00Z",
      progress: "80%",
      status: "In Progress",
      submittedAt: new Date("2024-05-15T11:15:00Z"),
      reviewer: "Dr. Brown",
    },
  ];
}

export async function getArticleSubmissionById(id: string | number) {
  const submissions = await getArticleSubmissions();
  return submissions.find((submission) => submission.id == id) || null;
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