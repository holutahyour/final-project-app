import { useAzureAuth } from "@/app/context/auth-context";
import AppChakraTimelines from "@/components/app/app-chakra-timeline";
import AppDrawer from "@/components/app/app-drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/sdcn-avatar";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER, APP_ERP_SETTINGS_DIALOG } from "@/lib/routes";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
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
            title={`${!profile ? "Edit " : ""}Profile`}
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
                        <Avatar className="h-16 w-16 rounded-full">
                            <AvatarImage src={""} alt={user?.name} />
                            <AvatarFallback className="rounded-full">
                                <Camera />
                            </AvatarFallback>
                        </Avatar>
                        <Stack gap='2'>
                            <Text className="font-bold text-lg">{user?.name}</Text>
                            <Text className="text-sm">Computer Science</Text>
                            <Text className="text-sm">400L</Text>
                        </Stack>
                    </HStack>
                </Box>

                <Box className="bg-white shadow-sm px-8 py-8 rounded-2xl border pb-4">
                    <AppChakraTimelines
                        timelines={[
                            {
                                title: "Document Submitted",
                                icon: <LuCheck />,
                            },
                            {
                                title: "Under Review",
                                icon: <LuCheck />,
                            },
                            {
                                title: "Final Review",
                                icon: <LuCheck />,
                            },
                        ]}
                    />
                </Box>
            </Stack>
        </AppDrawer>
    );

}

export default ReviewDetail