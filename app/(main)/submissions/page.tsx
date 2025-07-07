"use client";

import AppEmptyState from "@/components/app/app-empty-state";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER } from "@/lib/routes";
import { Heading, HStack, Stack } from "@chakra-ui/react";
import SubmitArticle from "./submit-article/submit-article";
import { useCallback, useLayoutEffect, useState } from "react";
import { IReviewInProgress } from "@/data/interface/IReviewInProgress";
import AppDataTable from "@/components/app/app-data-table";
import { submissionColumns } from "./_components/column";

export default function Page() {
  const { router, searchParams } = useQuery(APP_DRAWER, "true");

  const [submissions, setSubmissions] = useState<IReviewInProgress[]>([])
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

  return <Stack>
    {submissions.length === 0 ? <AppEmptyState
      heading="Nothing here yet!"
      description="Articles You submit would appear here"
      primaryButtonText="Submit an Article"
      onPrimaryButtonClick={handleCreateSubmission}
    /> :
      <AppDataTable
        loading={tableLoader}
        columns={submissionColumns(reloadData)}
        data={submissions}
        titleElement={<></> }
      // filter="accountName"
      // filterPlaceholder="Filter account names..."
      />}
    <SubmitArticle />
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