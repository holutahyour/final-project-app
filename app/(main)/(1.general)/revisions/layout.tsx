"use client"
import AppPageHeader from "@/components/app/app-page-header";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER } from "@/lib/routes";
import { Button, Stack } from "@chakra-ui/react";
import { RefreshCcwDot } from "lucide-react";

interface PageLayoutProps extends React.PropsWithChildren<{}> { }

function DashboardLayout({ children }: PageLayoutProps) {
   const { router, searchParams } = useQuery(APP_DRAWER, "true");
  
    const createSubmissionUrl = useModifyQuery(
      null,
      searchParams,
      [{ key: APP_DRAWER, value: "true" }],
      "set"
    );
  return (
    <>

      <AppPageHeader title="Revisions" Icon={RefreshCcwDot}>
        <Button fontWeight="bold" onClick={() => router.push(createSubmissionUrl)}>Submit Article</Button>
      </AppPageHeader>
      <Stack mx={{ base: "4", lg: "6" }} pt="2" className="h-full">
        {children}
      </Stack>

    </>
  );
}

export default DashboardLayout;
