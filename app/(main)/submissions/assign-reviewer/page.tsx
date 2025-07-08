"use client"
import { Badge, Checkbox, Heading, Input, Stack } from "@chakra-ui/react";


import { useAzureAuth } from "@/app/context/auth-context";
import AppDataList from "@/components/ui/app-data-list";
import { IReviewInProgress } from "@/data/interface/IReviewInProgress";
import { useCallback, useEffect, useState } from "react";
import { getArticleSubmissionById } from "../page";
import { useSearchParams } from "next/navigation";
import { Field } from "@/components/ui/chakra-field";
import AppCombobox from "@/components/app/app-chakra-combo-box";
import AppEmptyState from "@/components/app/app-empty-state";
import AppDataTable from "@/components/app/app-data-table";
import { getColumns } from "./_components/column";
function AssignReviewerPage() {
    const { user } = useAzureAuth();
    const searchParams = useSearchParams();

    const [submission, setSubmission] = useState<IReviewInProgress | null>({} as IReviewInProgress);

    const handleStatus = (status: string) => {
        switch (status) {
            case "Under Review":
                return "orange";
            case "Reviewed":
                return "green";
            case "Pending":
                return "gray";
            default:
                return "gray";
        }
    }

    // Sample reviewers data state
    const [reviewers, setReviewers] = useState<{
        id: number;
        name: string;
        department: string;
        expertise: string;
        assignments: number;
        status: string;
    }[]>([]);

    const [tableLoader, setTableLoader] = useState(false);

    const fetchReviewers = useCallback(async () => {
        setTableLoader(true);
        // Example: Replace with your API call
        const reviewers = await getReviewers();
        setReviewers(reviewers);
        setTableLoader(false);
    }, []);

    const reloadData = useCallback(async () => {
        const response = await getArticleSubmissionById(searchParams.get("id") || "")
        setSubmission(response);
        // Fetch reviewers when reloading data
        fetchReviewers();
    }, [searchParams, fetchReviewers]);

    useEffect(() => {
        reloadData();
    }, [reloadData, searchParams])

    return (
        <Stack gap={6} className="pb-4">
            <Stack direction={{ base: "column", lg: "row" }} gap={4} className="items-center shadow-sm border-2 rounded-lg p-6">
                <Stack flex="1" gap={4} className="">
                    <Heading size="lg">{submission?.title}</Heading>
                    <Stack direction={{ base: "column", lg: "row" }} gap={20}>
                        <AppDataList
                            data={[
                                { label: "Version:", value: submission?.progress || "N/A" },
                                {
                                    label: "Submitted on:", value: submission?.submittedAt?.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    }) || "N/A"
                                },
                            ]}
                            gap="1"
                            orientation="horizontal"
                            size="md"
                        />
                        <AppDataList
                            data={[
                                { label: "Status:", value: <Badge className="font-semibold" colorPalette={`${handleStatus(submission?.status ?? "")}`}>{submission?.status}</Badge> },
                            ]}
                            gap="1"
                            orientation="horizontal"
                        />
                    </Stack>

                </Stack>
            </Stack>
            <Stack direction={{ base: "column", lg: "row" }} gap={4} className="flex-1">
                <Stack gap={6} className="w-64 shadow-sm border-2 rounded-lg p-6">
                    <Heading size="md">Filter</Heading>
                    <Stack gap={2}>
                        <Checkbox.Root>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>All</Checkbox.Label>
                        </Checkbox.Root>
                        <Checkbox.Root>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>Assigned</Checkbox.Label>
                        </Checkbox.Root>
                        <Checkbox.Root>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>Unassigned</Checkbox.Label>
                        </Checkbox.Root>
                    </Stack>
                    <Stack gap={4}>
                        <AppCombobox label="Department" data={frameworks} size="xs" />
                        <AppCombobox label="Area of Expertise" data={frameworks} size="xs" />
                    </Stack>
                </Stack>
                <Stack gap={4} className="flex-1 shadow-sm border rounded-lg">
                    {reviewers.length === 0 ? <AppEmptyState
                        heading="Nothing here yet!"
                        description="No reviewer avaiable"
                        primaryButtonText="Submit an Article"
                    //onPrimaryButtonClick={handleCreateSubmission}
                    /> :
                        <AppDataTable
                            loading={tableLoader}
                            columns={getColumns(reloadData)}
                            data={reviewers}
                            titleElement={<Heading size='md'>Select Reviewer(s)</Heading>}
                        // filter="accountName"
                        // filterPlaceholder="Filter account names..."
                        />}
                </Stack>
                {/* <Stack gap={4} className="flex-1 shadow-sm border-2 rounded-lg p-6">
                    <Heading size="md" className="mb-2">Assign Reviewer</Heading>
                    <Field label="Reviewer" flex="1">
                        <AppCombobox label="Select Reviewer" data={frameworks} />
                    </Field>
                    <Field label="Comments" flex="1">
                        <Input placeholder="Add any comments or instructions for the reviewer" />
                    </Field>
                </Stack> */}
            </Stack>
        </Stack>
    )
}

export default AssignReviewerPage

export const frameworks = [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Preact", value: "preact" },
    { label: "Qwik", value: "qwik" },
    { label: "Lit", value: "lit" },
    { label: "Alpine.js", value: "alpinejs" },
    { label: "Ember", value: "ember" },
    { label: "Next.js", value: "nextjs" },
]

export async function getReviewers() {
    //const Info = await apiHandler.students.list();
    return [
        {
            id: 1,
            name: "Dr. Alice Smith",
            department: "Computer Science",
            expertise: "Artificial Intelligence",
            assignments: 2,
            status: "Assigned"
        },
        {
            id: 2,
            name: "Prof. John Doe",
            department: "Mathematics",
            expertise: "Statistics",
            assignments: 0,
            status: "Unassigned"
        },
        {
            id: 3,
            name: "Dr. Emily Johnson",
            department: "Physics",
            expertise: "Quantum Mechanics",
            assignments: 1,
            status: "Assigned"
        },
        {
            id: 4,
            name: "Dr. Michael Lee",
            department: "Biology",
            expertise: "Genetics",
            assignments: 0,
            status: "Unassigned"
        }
    ];
}