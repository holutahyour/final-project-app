"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/sdcn-avatar";
import { IReviewInProgress } from "@/data/interface/IReviewInProgress";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER } from "@/lib/routes";
import { Box, DataList, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Camera } from "lucide-react";
import { useCallback, useLayoutEffect, useState } from "react";
import EditProfile from "./edit-profile/edit-profile";
import { useAzureAuth } from "@/app/context/auth-context";
import AppDataList from "@/components/ui/app-data-list";

export default function DashboardPage() {
  const { router, searchParams } = useQuery(APP_DRAWER, "true");

  const [submissions, setSubmissions] = useState<IReviewInProgress[]>([])
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const { user } = useAzureAuth()



  const reloadData = useCallback(async () => {
    setTableLoader(true);

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

  return (
    <>
      <Stack gap='6' pb='10'>
        <Box className="bg-white shadow-sm px-8 py-6 rounded-2xl border">
          <HStack gap='6'>
            <Avatar className="h-28 w-28 rounded-full">
              <AvatarImage src={""} alt={user?.name} />
              <AvatarFallback className="rounded-full">
                <Camera />
              </AvatarFallback>
            </Avatar>
            <Stack>
              <Text className="font-bold text-md">{user?.name}</Text>
              <Text className="text-xs">Computer Science</Text>
              <Text className="text-xs">400L</Text>
            </Stack>
          </HStack>
        </Box>

        <Box className="bg-white shadow-sm px-8 py-6 rounded-2xl border">
          <Stack gap='6'>
            <Heading>Personal Information</Heading>
            <Stack gap='6' direction={{ base: "column", md: "row" }}>              
              <AppDataList
                data={[
                  { label: "First Name", value: user?.givenName || "N/A" },
                  { label: "Email", value: user?.mail || "N/A" },
                ]}
              />
              <AppDataList
                data={[
                  { label: "Last Name", value: user?.mobilePhone || "N/A" },
                  { label: "Phone Number", value: user?.department || "N/A" },
                ]}
              />              
            </Stack>
          </Stack>
        </Box>

        <Box className="bg-white shadow-sm px-8 py-6 rounded-2xl border">
          <Stack gap='6'>
            <Heading>Academic Details</Heading>
            <Stack gap='6' direction={{ base: "column", md: "row" }}>              
              <AppDataList
                data={[
                  { label: "Matric Number", value: user?.givenName || "N/A" },
                  { label: "Department", value: user?.mail || "N/A" },
                ]}
              />
              <AppDataList
                data={[
                  { label: "Faculty", value: user?.mobilePhone || "N/A" },
                  { label: "Level", value: user?.department || "N/A" },
                ]}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <EditProfile />
    </>
  )
}

