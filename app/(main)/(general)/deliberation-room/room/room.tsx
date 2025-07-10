import { useAzureAuth } from "@/app/context/auth-context";
import AppDrawer from "@/components/app/app-drawer";
import AppDataList from "@/components/ui/app-data-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/sdcn-avatar";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER, APP_ERP_SETTINGS_DIALOG } from "@/lib/routes";
import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Camera } from "lucide-react";
import { useState } from "react";

function Room() {
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
            title={`Deliberation Room`}
            placement="end"
            size="full"
            open={open}
            redirectUri={redirectUri}
            cancelQueryKey={APP_ERP_SETTINGS_DIALOG}
            confirmCancel={false}
        >
            <Stack gap='6'>
                
            </Stack>
        </AppDrawer>
    );

}

export default Room