"use client"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/sdcn-collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sdcn-sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMain({
  items,
  isSubMenus,
  disableSubMenu,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[],
  }[],
  isSubMenus?: boolean,
  disableSubMenu?: boolean
}) {

  const pathname = usePathname();
  // console.log(pathname);
  //   const handleNavigation = (url: string) => {
  //   window.location.href = url; 
  // };

  return (
    <SidebarGroup>
      {/* {!isSubMenus && <SidebarGroupLabel>Platform</SidebarGroupLabel>} */}
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}
              //  onClick={() => handleNavigation(item.url)               
              //  }
>
                <Link
                  href={item.url}
                  className={!isSubMenus ?(`p-2 py-5 ${pathname === item.url && "bg-primary text-educ8_white-1 font-bold"}`) : (`${pathname === item.url && "border-r-[3px] text-primary border-primary rounded-none"}`)}
                  prefetch={true}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.items?.length && !disableSubMenu ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton className={`${pathname === subItem.url && "border-r-[4px] border-primary rounded-r-none"}`} asChild>
                            <Link href={subItem.url} prefetch={true}>
                              <item.icon />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
