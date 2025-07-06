"use client";

import AppPageHeader from "@/components/app/app-page-header";
import { NavMain } from "@/components/sdcn-nav-main";
import { SidebarProvider } from "@/components/ui/sdcn-sidebar";
import { sidebarData } from "@/data/sidebar-data";
import { BILLING, GENERAL_SETUP, SCHOOL_CONFIG } from "@/lib/routes";
import { Grid, GridItem, HStack, Stack } from "@chakra-ui/react";
import { Cog } from "lucide-react";
// import AppLoader from "../_components/app-loader";
// import { useAuth } from "@/hooks/use-auth";

interface PageLayoutProps extends React.PropsWithChildren<{}> {}

function FinancialSetupLayout({ children }: PageLayoutProps) {
  // const [user] = useAuth();

  // if (!user) return <AppLoader />;

  return (
    <>
      <AppPageHeader title="Financial Setup" Icon={Cog} />
      <Grid
        templateColumns="repeat(14, 1fr)"
        alignItems="flex-start"
        h="full"
        overflow="hidden"
      >
        {/* <GridItem colSpan={2}>
          <SidebarProvider>
            <NavMain items={sidebarData.navMain.find(x => x.url === BILLING)?.items} disableSubMenu isSubMenus />
          </SidebarProvider>
        </GridItem> */}

        <GridItem colSpan={12} h="full" overflow="auto">
          <Stack mx={{ base: "4" }} gap="6" pt="2">
            {children}
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
}

export default FinancialSetupLayout;
