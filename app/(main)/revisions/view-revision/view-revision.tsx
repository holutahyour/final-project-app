import AppDrawer from "@/components/app/app-drawer";
import { IArticleRevision, IReviewer } from "@/data/interface/IArticleRevision";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER, APP_ERP_SETTINGS_DIALOG } from "@/lib/routes";
import { Badge, Heading, Stack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { getArticleRevisionById } from "../page";
import AppDataList from "@/components/ui/app-data-list";

function ViewRevision() {
  const [revision, setRevision] = useState<IArticleRevision | null>();
  const { searchParams, open } = useQuery(APP_DRAWER, "true");

  const redirectUri = useModifyQuery(null, searchParams, [
    { key: APP_DRAWER, value: "true" },
  ]);

  const onSubmit = () => {
    console.log("submitted");
  };

  const reloadData = useCallback(async () => {
    const response = await getArticleRevisionById(searchParams.get("id") || "")
    setRevision(response);
  }, [searchParams]);

  useEffect(() => {

    reloadData();
  }, [reloadData, searchParams])

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


  return (
    <AppDrawer
      title={`Feedback`}
      placement="end"
      size="lg"
      open={open}
      //redirectUri={redirectUri}
      cancelQueryKey={APP_ERP_SETTINGS_DIALOG}
      hasFooter
      saveButtonTitle="Submit Revised Version"
      confirmCancel={false}
    >
      <Stack gap='6'>
        <Stack direction={{ base: "column", lg: "row" }} gap={4} className="items-center">
          <Stack flex="1" gap={6} className="">
            <Heading size="xl">{revision?.articleName}</Heading>
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
                size="md"
              />
              <AppDataList
                data={[
                  { label: "Status:", value: <Badge className="font-semibold" colorPalette={`${handleStatus(revision?.status ?? "")}`}>{revision?.status}</Badge> },
                ]}
                gap="1"
                orientation="horizontal"
              />
            </Stack>
            {/* {revision?.reviewers && revision.reviewers.length > 0 && (
            <Stack direction={{ base: "column", lg: "row" }} gap={4} flexWrap="wrap">
              {revision.reviewers.map(handleReviewer)}
            </Stack>
          )} */}
          </Stack>
        </Stack>

        <Stack className="bg-white shadow-sm px-8 py-6 rounded-2xl border">
          <Heading size="md" className="mb-4">Reviewers Feedback</Heading>
          {revision?.reviewers && revision.reviewers.length > 0 ? (
            revision.reviewers.map((reviewer) => (
              <Stack key={reviewer.name} direction="column" gap={4} className="border-b pb-4">
                <Heading size="sm">{reviewer.name}</Heading>
                {reviewer.feedbacks.map((feedback, index) => (
                  <Stack key={index} direction="column" gap={2}>
                    <span className="text-gray-500">{feedback.page ? `Page ${feedback.page}` : "General Feedback"}:</span>
                    <span>{feedback.feedback || "No feedback provided"}</span>
                    <span className="text-xs text-gray-400">{feedback.date ? feedback.date.toLocaleDateString("en-US") : "No date provided"}</span>
                  </Stack>
                ))}
              </Stack>
            ))
          ) : (
            <span className="text-gray-500">No feedback available</span>
          )}
        </Stack>
      </Stack>
    </AppDrawer>
  );

}

export default ViewRevision