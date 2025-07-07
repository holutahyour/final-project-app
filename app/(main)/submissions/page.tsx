"use client";

import AppDataTable from "@/components/app/app-data-table";
import AppEmptyState from "@/components/app/app-empty-state";
import { IReviewInProgress } from "@/data/interface/IReviewInProgress";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER } from "@/lib/routes";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { useCallback, useLayoutEffect, useState } from "react";
import { submissionColumns } from "./_components/column";
import ReviewArticle from "./review-document/review-article";
import SubmitArticle from "./submit-article/submit-article";

export default function Page() {
  const { router, searchParams } = useQuery(APP_DRAWER, "true");

  const [submissions, setSubmissions] = useState< []>([])
  const [tableLoader, setTableLoader] = useState<boolean>(false);


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
              <Button
                className="bg-primary my-1 rounded-sm font-semibold"
                size="xs"
                width='24'
              >
                Continue
              </Button>
              <Button
                className="bg-primary my-1 rounded-sm font-semibold"
                size="xs"
                width='24'
                onClick={() => {
                  router.push(`${createSubmissionUrl}&id=${value.id}`);
                }}
              >
                Review
              </Button>
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
        titleElement={<></>}
      // filter="accountName"
      // filterPlaceholder="Filter account names..."
      />}
    <SubmitArticle />
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
  return submissions.find((submission) => submission.id === id) || null;
}