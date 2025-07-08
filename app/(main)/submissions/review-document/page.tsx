"use client"
import { Badge, Box, FileUpload, Heading, HStack, Icon, Stack, useFileUpload, Text, Input, Button, Group } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { FaFileUpload } from "react-icons/fa";

const AppFileViewer = dynamic(() => import("@/components/app/app-file-viewer"), { ssr: false });

import { useAzureAuth } from "@/app/context/auth-context";
import AppDataList from "@/components/ui/app-data-list";
import React, { useState } from "react";
import { IReviewInProgress } from "@/data/interface/IReviewInProgress";
import AppChakraTimelines from "@/components/app/app-chakra-timeline";
import { Field } from "@/components/ui/chakra-field";
function ReviewArticlePage({ submission }: { submission: IReviewInProgress | null }) {
    const { user } = useAzureAuth();

    const fileUpload = useFileUpload({ maxFiles: 1 });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Add missing state variables
    const [timelines, setTimelines] = useState<{
        icon: React.ReactNode;
        title: string;
        description: React.ReactNode;
        timestamp?: string;
        status: string;
    }[]>([]);
    const [pageInput, setPageInput] = useState<string>("");
    const [feedbackInput, setFeedbackInput] = useState<string>("");

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

    return (
        <Stack className="shadow-sm border-2 rounded-lg pl-4 min-h-full" direction={{ base: "column", md: "row" }} gap={6} alignItems="stretch" justifyContent="space-between">
            <Stack className="flex flex-col min-w-96 h-full overflow-y-auto py-4">
                <Heading size='2xl' className="font-bold mb-4">{user?.name}</Heading>
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
            <Box className="flex-1">
                {selectedFile ?
                    <Box className="flex-1 h-[80dvh]"><AppFileViewer file={selectedFile} /></Box>
                    :
                    <Box className="flex-1 h-[80dvh] grid place-items-center border"><Heading size="4xl" className="font-extrabold">Document</Heading></Box>}
                <Stack className="py-6 p-10">
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            setTimelines(prev => [
                                ...prev,
                                {
                                    title: `Page ${pageInput}`,
                                    description: feedbackInput,
                                    status: "feedback",
                                    icon: Number(pageInput),
                                }
                            ]);
                            setPageInput("");
                            setFeedbackInput("");
                        }}
                    >
                        <HStack mb={4} gap={2}>
                            <Field
                                required
                                label="Page Number"
                                flex="1"
                            >
                                <Input
                                    type="number"
                                    min={1}
                                    placeholder="Page number"
                                    value={pageInput}
                                    onChange={e => setPageInput(e.target.value)}
                                    required
                                />
                            </Field>
                            <Field
                                required
                                label="Feedback"
                                flex="4"
                            >
                                <Group attached w="full">
                                    <Input type="text"
                                        placeholder="Feedback"
                                        value={feedbackInput}
                                        onChange={e => setFeedbackInput(e.target.value)}
                                        required
                                    />
                                    <Button type="submit">
                                        Submit
                                    </Button>
                                </Group>                                
                            </Field>                            

                        </HStack>
                    </form>
                    <AppChakraTimelines timelines={timelines.map(item => ({
                        ...item,
                        description: Array.isArray(item.description)
                            ? (
                                <Stack gap={1}>
                                    {item.description.map((desc, idx) => (
                                        <Text className="font-semibold" key={idx}>{desc}</Text>
                                    ))}
                                </Stack>
                            )
                            : item.description
                    }))} />

                </Stack>
            </Box>
        </Stack>
    )
}

export default ReviewArticlePage