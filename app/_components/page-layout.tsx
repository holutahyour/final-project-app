'use client'
import { AppSidebar } from "@/components/scdn-app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/sdcn-breadcrumb"
import { Separator } from "@/components/ui/sdcn-separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sdcn-sidebar"
// import { useAuth } from "@/hooks/use-auth"
import { SIGN_IN, SIGN_UP } from "@/lib/routes"
import { Box, Container } from "@chakra-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router";
import Loading from "@/app/loading";
import AppLoader from "./app-loader"
import { NavUser } from "@/components/nav-user"
import { useAzureAuth } from "../context/auth-context"

interface PageLayoutProps extends React.PropsWithChildren<{}> { }

function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(segment => segment);

      const { user } = useAzureAuth();
  

  // const [user] = useAuth();

  // if (!user || (pathname.endsWith(SIGN_IN) || pathname.endsWith(SIGN_UP))) {
  //   return <>{children}</>; // No layout for /admin
  // }

  if (!user) return <AppLoader />;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-dvh overflow-hidden gap-4">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 flex-grow">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbLink href="/dashboard">
                  Home
                </BreadcrumbLink>
                {pathSegments.map((segment, index) => {
                  const href = "/" + pathSegments.slice(0, index + 1).join("/");
                  const isLast = index === pathSegments.length - 1;

                  return (
                    <li key={href} className="flex items-center space-x-2">
                      <BreadcrumbSeparator className="hidden md:block" />
                      {!isLast ? (
                        <BreadcrumbLink href={href} className="capitalize">
                          {decodeURIComponent(segment.replace(/-/g, " "))}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbItem>
                          <BreadcrumbPage className="capitalize font-semibold">{decodeURIComponent(segment.replace(/-/g, " "))}</BreadcrumbPage>
                        </BreadcrumbItem>
                      )}
                    </li>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Box mx='4'>
            <NavUser user={user} />
          </Box>
        </header>
        <Box className="flex flex-1 flex-col gap-2 pt-0 overflow-y-auto py-auto">
          {children}
        </Box>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default PageLayout