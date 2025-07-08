import AppDrawer from "@/components/app/app-drawer";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER, APP_ERP_SETTINGS_DIALOG } from "@/lib/routes";
import { Box, useFileUpload } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { getArticleSubmissionById } from "../page";
import { IReviewInProgress } from "@/data/interface/IReviewInProgress";
import ReviewArticlePage from "./page";

function ReviewArticle() {
    const [submission, setSubmission] = useState<IReviewInProgress | null>({} as IReviewInProgress);
    const { searchParams, open } = useQuery(APP_DRAWER, "true");

    const redirectUri = useModifyQuery(null, searchParams, [
        { key: APP_DRAWER, value: "true" },
    ]);

    const fileUpload = useFileUpload({ maxFiles: 1 });
    const [isImporting, setIsImporting] = useState(false);

    const onSubmit = () => {
        console.log("submitted");
    };

    const reloadData = useCallback(async () => {
        const response = await getArticleSubmissionById(searchParams.get("id") || "")
        console.log("Submission data:", response);
        setSubmission(response);
    }, [searchParams]);



    useEffect(() => {
        reloadData();
    }, [reloadData, searchParams])

    return (
        <AppDrawer
            //title={`Review Article`}
            placement="end"
            size="full"
            open={open}
            redirectUri={redirectUri}
            cancelQueryKey={APP_ERP_SETTINGS_DIALOG}
        >
            <Box className="p-2 pb-10">
                <ReviewArticlePage submission={submission} />
                <Box></Box>
            </Box>
        </AppDrawer>
    );

}

export default ReviewArticle