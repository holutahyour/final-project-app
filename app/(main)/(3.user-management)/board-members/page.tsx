"use client";

import AppCombobox from "@/components/app/app-chakra-combo-box";
import AppDataTable from "@/components/app/app-data-table";
import AppEmptyState from "@/components/app/app-empty-state";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER } from "@/lib/routes";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { useCallback, useLayoutEffect, useState } from "react";
import Profile from "./profile/profile";
import apiHandler from "@/data/api/ApiHandler";
import { IUser } from "@/data/interface/IUser";
import { getColumns } from "./_components/column";

export default function Page() {
  const { router, searchParams } = useQuery(APP_DRAWER, "true");

  const [boardMembers, setBoardMembers] = useState<IUser[]>([])
  const [tableLoader, setTableLoader] = useState<boolean>(false);


  const reloadData = useCallback(async () => {
    setTableLoader(true);

    const fetched = await getBoardMembers();
    console.log("Fetched Board Members:", fetched);
    
    setBoardMembers(fetched);
    setTableLoader(false);

  }, []);

  useLayoutEffect(() => {
    reloadData()
  }, [reloadData]);

  const viewProfileUrl = useModifyQuery(
    null,
    searchParams,
    [{ key: APP_DRAWER, value: "true" }],
    "set"
  );

  const handleReviewDetail = () => {
    //setSelectedErpSetting(erpSetting);
    router.push(`${viewProfileUrl}`);
    //console.log("Selected Erp Setting:", erpSetting);
  };

  const modifiedColumns = getColumns(reloadData).map((column) => {
    if (column.id === "actions") {
      return {
        ...column,
        cell: ({ row }: any) => {
          const value = row.original;

          return (
            <HStack justifyContent="center" width="100%">
              <Button
                className="bg-primary my-1 rounded-sm font-semibold"
                size="xs"
                width='24'
                onClick={() => {
                  router.push(`${viewProfileUrl}&id=${value.id}`);
                }}
              >
                View Profile
              </Button>
            </HStack>
          );
        },
      };
    }
    return column;
  });


  return <Stack className="pb-6">
    {boardMembers.length === 0 ? <AppEmptyState
      heading="Nothing here yet!"
      description="Submitted articles would appear here"
    /> :
      <AppDataTable
        loading={tableLoader}
        columns={modifiedColumns}
        data={boardMembers}
        titleElement={
          <Stack direction={{ base: "column", md: "row" }} gap={4}>
            <AppCombobox label="Faculty" data={frameworks} size="xs" />
            <AppCombobox label="Department" data={frameworks} size="xs" />
          </Stack>}
      />}
      <Profile />
  </Stack>;
}

export async function getBoardMembers() {
  const Info = await apiHandler.users.boardMembers();
  return Info?.content ?? [];
}

// export async function getBoardMembers() {
//   return [
//     {
//       id: 1,
//       name: "Alice Johnson",
//       title: "AI in Modern Education",
//       status: "Under Review",
//       reviewers: [
//         { name: "Dr. Smith", hasFeedback: true },
//         { name: "Dr. Lee", hasFeedback: false },
//       ],
//       lastOpened: "2024-06-01T12:00:00Z",
//       progress: "50%",
//       submittedAt: new Date("2024-05-01T10:00:00Z"),
//     },    
//   ];
// }

export async function getBoardMemberById(id: string | number) {
  const boardMembers = await getBoardMembers();
  return boardMembers.find((boardMember) => boardMember.id == id) || null;
}

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
