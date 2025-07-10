"use client"
import AppPageHeader from "@/components/app/app-page-header";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER } from "@/lib/routes";
import { Stack } from "@chakra-ui/react";
import { GraduationCap, UsersRoundIcon, Video } from "lucide-react";
import { usePathname } from "next/navigation";

interface PageLayoutProps extends React.PropsWithChildren<{}> { }

function Layout({ children }: PageLayoutProps) {
  const { router, searchParams } = useQuery(APP_DRAWER, "true");

  const pathname = usePathname();

  const createSubmissionUrl = useModifyQuery(
    null,
    searchParams,
    [{ key: APP_DRAWER, value: "true" }],
    "set"
  );
  return (
    <>
      <AppPageHeader title="Deleberation Room" Icon={Video}>
      </AppPageHeader>
      <Stack mx={{ base: "4", lg: "6" }} pt="2" className="h-full">
        {children}
      </Stack>
    </>
  )
}

export default Layout;
