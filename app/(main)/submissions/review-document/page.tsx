"use client"
import { Badge, Box, FileUpload, Heading, HStack, Icon, Stack, useFileUpload } from "@chakra-ui/react";
import { FaFileUpload } from "react-icons/fa";
import dynamic from "next/dynamic";

const AppFileViewer = dynamic(() => import("@/components/app/app-file-viewer"), { ssr: false });

import React, { useCallback, useEffect, useState } from "react";
import { useAzureAuth } from "@/app/context/auth-context";
import { useQuery } from "@/hooks/use-query";
import { getArticleSubmissionById } from "../page";
import { APP_DRAWER } from "@/lib/routes";
import { IReviewInProgress } from "@/data/interface/IReviewInProgress";
import AppDataList from "@/components/ui/app-data-list";
function ReviewDocument() {
    const { user } = useAzureAuth();
    const { searchParams, open } = useQuery(APP_DRAWER, "true");

    const [submission, setSubmission] = useState<IReviewInProgress | null>();
    const fileUpload = useFileUpload({ maxFiles: 1 });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const reloadData = useCallback(async () => {
        const response = await getArticleSubmissionById(searchParams.get("id") || "")
        setSubmission(response);
    }, [searchParams]);

    const handleStatus = (status: string) => {
        switch (status) {
            case "In Progress":
                return "orange";
            case "Reviewed":
                return "green";
            case "Pending":
                return "gray";
            default:
                return "gray";
        }
    }

    useEffect(() => {
        reloadData();
    }, [reloadData, searchParams])

    return (
        <Stack direction={{ base: "column", md: "row" }} gap={4} alignItems="stretch" justifyContent="space-between">
            <Stack className="flex flex-col min-w-96 h-full overflow-y-auto">
                <Heading>{user?.name}</Heading>
                <Heading>{submission?.title}</Heading>

                <HStack>
                    <AppDataList
                        data={[
                            { label: "Status:", value: <Badge className="font-semibold" colorPalette={`${handleStatus(submission?.status ?? "")}`}>{submission?.status}</Badge> },
                            {
                                label: "Submitted On:", value: submission?.submittedAt.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }) || "N/A"
                            },
                            { label: "Progress:", value: <Badge className="font-semibold" colorPalette={`green`}>{submission?.progress}</Badge> },
                        ]}
                        gap="1"
                        orientation="horizontal"
                        size="md"
                    />
                </HStack>
                <FileUpload.RootProvider
                    //maxW="xl"
                    alignItems="stretch"
                    value={fileUpload}
                >
                    <FileUpload.HiddenInput
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const files = event.target.files;
                            if (files && files.length > 0) {
                                setSelectedFile(files[0]);
                                console.log("Selected file:", files[0]);
                            } else {
                                setSelectedFile(null);
                            }
                        }}
                    />
                    <FileUpload.Dropzone>
                        <Icon size="xl" color="fg.muted">
                            <FaFileUpload />
                        </Icon>
                        <FileUpload.DropzoneContent>
                            <Box fontWeight='bold'>Drag and drop your article here or Select file</Box>
                            <Box color="fg.muted" fontSize='xs'>.PDF, DOC, or DOCX to 50MB</Box>
                        </FileUpload.DropzoneContent>
                    </FileUpload.Dropzone>
                    <FileUpload.List showSize clearable />
                </FileUpload.RootProvider>
            </Stack>
            {selectedFile && <Box className="flex-1 shadow-sm border-2 rounded-sm p-3"><AppFileViewer file={selectedFile} /></Box>}

        </Stack>
    )
}

export default ReviewDocument