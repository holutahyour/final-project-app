import AppPageHeader from "@/components/app/app-page-header";
import { Stack } from "@chakra-ui/react";
import { LayoutDashboard } from "lucide-react";

interface PageLayoutProps extends React.PropsWithChildren<{}> {}

function DashboardLayout({ children }: PageLayoutProps) {


  return (
    <>

      <AppPageHeader title="Home" Icon={LayoutDashboard} />
      <Stack mx={{ base: "4", lg: "6" }} gap="6" pt="2">
        {children}
      </Stack>

    </>
  );
}

export default DashboardLayout;
