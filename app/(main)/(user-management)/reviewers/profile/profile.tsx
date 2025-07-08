import { useAzureAuth } from "@/app/context/auth-context";
import AppChakraTimelines from "@/components/app/app-chakra-timeline";
import AppDrawer from "@/components/app/app-drawer";
import AppDataList from "@/components/ui/app-data-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/sdcn-avatar";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER, APP_ERP_SETTINGS_DIALOG } from "@/lib/routes";
import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Camera } from "lucide-react";
import { useState } from "react";
import { LuCheck } from "react-icons/lu";

function ReviewDetail() {
    const [profile, setProfile] = useState<null>();
    const { searchParams, open } = useQuery(APP_DRAWER, "true");
    const { user } = useAzureAuth()


    const redirectUri = useModifyQuery(null, searchParams, [
        { key: APP_DRAWER, value: "true" },
    ]);

    const onSubmit = () => {
        console.log("submitted");
    };

    return (
        <AppDrawer
            title={`View Profile`}
            placement="end"
            size="lg"
            open={open}
            redirectUri={redirectUri}
            cancelQueryKey={APP_ERP_SETTINGS_DIALOG}
            confirmCancel={false}
        >
            <Stack gap='6'>
                <Box className="bg-white shadow-sm px-8 py-4 rounded-2xl border">
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
                                className="w-full"
                            />
                            <AppDataList
                                data={[
                                    { label: "Last Name", value: user?.mobilePhone || "N/A" },
                                    { label: "Phone Number", value: user?.department || "N/A" },
                                ]}
                                className="w-full"
                            />
                        </Stack>
                    </Stack>
                </Box>
                
            </Stack>
        </AppDrawer>
    );

}

export default ReviewDetail