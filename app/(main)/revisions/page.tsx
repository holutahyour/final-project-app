"use client";

import AppEmptyState from "@/components/app/app-empty-state";
import AppDataList from "@/components/ui/app-data-list";
import { IArticleRevision, IReviewer } from "@/data/interface/IArticleRevision";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER } from "@/lib/routes";
import { Badge, Box, Button, Heading, Stack } from "@chakra-ui/react";
import { useCallback, useLayoutEffect, useState } from "react";
import ViewFeedback from "./view-revision/view-revision";

export default function Page() {
  const { router, searchParams } = useQuery(APP_DRAWER, "true");

  const [revisions, setRevisions] = useState<IArticleRevision[]>([])
  const [tableLoader, setTableLoader] = useState<boolean>(false);


  const reloadData = useCallback(async () => {
    setTableLoader(true);

    const fetched = await getArticleRevisions();
    setRevisions(fetched);
    setTableLoader(false);

  }, []);

  useLayoutEffect(() => {
    reloadData()
  }, [reloadData]);

  const createRevisionUrl = useModifyQuery(
    null,
    searchParams,
    [{ key: APP_DRAWER, value: "true" }],
    "set"
  );

  const handleViewRevision = (id: string | number) => {
    //setSelectedErpSetting(erpSetting);
    router.push(`${createRevisionUrl}&id=${id}`);
    //console.log("Selected Erp Setting:", erpSetting);
  };

  const handleStatus = (status: string) => {
    switch (status) {
      case "Under Review":
        return "orange";
      case "Reviewed":
        return "green";
      case "Pending":
        return "gray";
      default:
        return "gray";
    }
  }

  const handleReviewer = (reviewer: IReviewer) => {
    const feedbackCount = reviewer.feedbacks.filter(f => f.feedback !== null).length;

    return (
      <Stack key={reviewer.name} direction="row" gap={2} alignItems="center">
        <Badge className="font-semibold" colorPalette={feedbackCount === 0 ? "red" : "green"}>{reviewer.name}</Badge>
        <span className="text-sm text-gray-500">({feedbackCount} feedback{feedbackCount !== 1 ? 's' : ''})</span>
      </Stack>
    );
  }

  return <Stack>
    {!revisions ? <AppEmptyState
      heading="Nothing here yet!"
      description="You have no revisions yet"
    /> :
      <Box className="bg-white shadow-sm px-8 py-6 rounded-2xl border">
        {revisions.map((revision) => (
          <Stack direction={{ base: "column", lg: "row" }} gap={4} key={revision.id} className="border-b items-center py-6 pb-10">
            <Stack flex="1" gap={6}>
              <Heading size="lg">{revision.articleName}</Heading>
              <Stack direction={{ base: "column", lg: "row" }} gap={20}>
                <AppDataList
                  data={[
                    { label: "Version:", value: revision?.version || "N/A" },
                    {
                      label: "Submitted on:", value: revision?.dateSubmitted.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }) || "N/A"
                    },
                  ]}
                  gap="1"
                  orientation="horizontal"
                />
                <AppDataList
                  data={[
                    { label: "Status:", value: <Badge className="font-semibold" colorPalette={`${handleStatus(revision?.status)}`}>{revision?.status}</Badge> },
                  ]}
                  gap="1"
                  orientation="horizontal"
                />
              </Stack>
              {revision?.reviewers && revision.reviewers.length > 0 && (
                <Stack direction={{ base: "column", lg: "row" }} gap={4} flexWrap="wrap">
                  {revision.reviewers.map(handleReviewer)}
                </Stack>
              )}
            </Stack>
            <Button
              className="border-2 font-bold rounded-lg text-xs"
              borderColor="brand"
              colorPalette='brand'
              variant='outline'
              size='lg'
              onClick={() => handleViewRevision(revision.id)}
            >
              View Feedback
            </Button>
          </Stack>
        ))}

      </Box>}
    <ViewFeedback />
  </Stack>;
}


export async function getArticleRevisions() {
  //const Info = await apiHandler.students.list();
  // Sample data reflecting a typical article review process:
  // Sample data reflecting a typical article review process with reviewers possibly giving multiple feedbacks for different pages

  const allArticles: IArticleRevision[] = [
    {
      id: 1,
      articleName: "Deep Learning for Image Recognition",
      version: "v1.0",
      dateSubmitted: new Date("2024-06-01T09:00:00Z"),
      status: "Under Review",
      reviewers: [
        {
          name: "Dr. Alice Johnson",
          feedbacks: [
            {
              page: 1,
              feedback: "Excellent introduction and background.",
              date: new Date("2024-06-02T10:30:00Z"),
            },
            {
              page: 3,
              feedback: "Results section is well explained.",
              date: new Date("2024-06-02T11:00:00Z"),
            },
          ],
        },
        {
          name: "Prof. Mark Lee",
          feedbacks: [
            {
              page: 2,
              feedback: null,
              date: null,
            },
          ],
        },
        {
          name: "Dr. Susan Miller",
          feedbacks: [
            {
              page: 1,
              feedback: "Consider including more datasets for validation.",
              date: new Date("2024-06-03T13:15:00Z"),
            },
          ],
        },
      ],
    },
    {
      id: 2,
      articleName: "Blockchain in Healthcare",
      version: "v2.1",
      dateSubmitted: new Date("2024-06-03T14:20:00Z"),
      status: "Reviewed",
      reviewers: [
        {
          name: "Dr. Emily Carter",
          feedbacks: [
            {
              page: 2,
              feedback: "Well-structured and insightful analysis.",
              date: new Date("2024-06-04T11:00:00Z"),
            },
          ],
        },
        {
          name: "Dr. John Smith",
          feedbacks: [
            {
              page: 4,
              feedback: "Consider expanding on patient privacy concerns.",
              date: new Date("2024-06-05T09:45:00Z"),
            },
          ],
        },
        {
          name: "Prof. Linda Green",
          feedbacks: [
            {
              page: 1,
              feedback: "Add more recent references to related work.",
              date: new Date("2024-06-05T15:20:00Z"),
            },
            {
              page: 5,
              feedback: "Conclusion could be more concise.",
              date: new Date("2024-06-05T16:00:00Z"),
            },
          ],
        },
      ],
    },
    {
      id: 3,
      articleName: "Natural Language Processing Trends",
      version: "v1.2",
      dateSubmitted: new Date("2024-06-05T08:15:00Z"),
      status: "Pending",
      reviewers: [
        {
          name: "Prof. Linda Green",
          feedbacks: [
            {
              page: 2,
              feedback: null,
              date: null,
            },
          ],
        },
        {
          name: "Dr. Alice Johnson",
          feedbacks: [
            {
              page: 1,
              feedback: null,
              date: null,
            },
          ],
        },
      ],
    },
  ];

  // This structure allows the UI to easily show:
  // - Which reviewers are assigned to each article
  // - If they have left feedback (feedback !== null)
  // - How many feedbacks each reviewer left (feedbacks.length)
  // - Which pages have feedback or are pending

  return allArticles;
}

export async function getArticleRevisionById(id: string | number) {
  const allArticles = await getArticleRevisions();
  return allArticles.find(article => article.id === id || article.id === Number(id)) || null;
}