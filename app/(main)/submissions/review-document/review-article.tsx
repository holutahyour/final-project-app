import AppDrawer from "@/components/app/app-drawer";
import { Field } from "@/components/ui/chakra-field";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER, APP_ERP_SETTINGS_DIALOG } from "@/lib/routes";
import { Box, FileUpload, Icon, Input, Stack, Textarea, useFileUpload } from "@chakra-ui/react";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import ReviewDocument from "./page";

function ReviewArticle() {
    const [submission, setSubmission] = useState<null>();
    const { searchParams, open } = useQuery(APP_DRAWER, "true");

    const redirectUri = useModifyQuery(null, searchParams, [
        { key: APP_DRAWER, value: "true" },
    ]);

    const fileUpload = useFileUpload({ maxFiles: 1 });
    const [isImporting, setIsImporting] = useState(false);

    const onSubmit = () => {
        console.log("submitted");
    };

    return (
        <AppDrawer
            //title={`Review Article`}
            placement="end"
            size="full"
            open={open}
            redirectUri={redirectUri}
            cancelQueryKey={APP_ERP_SETTINGS_DIALOG}
        >
            <Box className="p-3">
                <ReviewDocument />
            </Box>
        </AppDrawer>
    );

}

export default ReviewArticle