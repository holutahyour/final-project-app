"use client";

declare global {
  interface Window {
    report: any;
  }
}

import { getColumns } from "@/app/_components/column";
import AppChakraProgress from "@/components/app/app-chakra-progress";
import AppChakraTimelines from "@/components/app/app-chakra-timeline";
import AppDataTable from "@/components/app/app-data-table";
import AppStats from "@/components/app/app-stats";
import { Button } from "@/components/ui/sdcn-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/sdcn-card";
import { Input } from "@/components/ui/sdcn-input";
import { Label } from "@/components/ui/sdcn-label";
import { IReviewInProgress } from "@/data/interface/IReviewInProgress";
import { compactNumber } from "@/lib/utils";
import { Badge, Box, Flex, Heading, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { useCallback, useLayoutEffect, useState } from "react";

import {
  FaUserClock
} from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineLibraryBooks } from "react-icons/md";

interface IPowerBi {
  embedConfig: {
    embedToken: string;
    embedUrl: string;
    reportId: string;
  };
}

function ReviewerDashboard({ embedConfig: { embedUrl, embedToken, reportId } }: IPowerBi) {
  // const [user] = useAuth();
  const [data, setData] = useState<IReviewInProgress[]>([]);
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [stats, setStats] = useState<
    {
      title: string;
      icon: JSX.Element;
      value: string;
    }[]
  >([]);

  const reloadData = useCallback(async () => {
    setTableLoader(true);

    const fetched = await getStudentData();
    setData(fetched);
    setTableLoader(false);

    const stats = await getStats()
    setStats(stats);

  }, []);

  useLayoutEffect(() => {
    reloadData()
  }, [reloadData]);

  return (
    <Stack mx={{ base: "4", lg: "10" }} gap="6">
      <HStack justify="space-between">
        {/* <PageDrawer /> */}
      </HStack>
      <HStack flexWrap="wrap" gap="10">
        {stats.map((stat, index) => (
          <AppStats
            key={index}
            title={stat.title}
            icon={stat.icon}
            value={stat.value}
          />
        ))}
      </HStack>
      <AppDataTable
        loading={tableLoader}
        columns={getColumns(reloadData)}
        data={data}
        titleElement={
          <HStack align="center" alignContent='center'>
            <Heading className="" size="lg" fontWeight='bold'>Review In Progress</Heading>
          </HStack>
        }
      // filter="accountName"
      // filterPlaceholder="Filter account names..."
      />
    </Stack>
  );
}

export async function getStudentData() {
  //const Info = await apiHandler.students.list();
  return [
    {
      id: 1,
      code: "REV-001",
      title: "AI in Modern Education",
      lastOpened: "2024-06-01T12:00:00Z",
      progress: "50%",
      status: "In Progress",
      submittedAt: new Date("2024-05-01T10:00:00Z"),
      reviewer: "Dr. Smith",
    },
    {
      id: 2,
      code: "REV-002",
      title: "Quantum Computing Basics",
      lastOpened: "2024-06-02T14:30:00Z",
      progress: "30%",
      status: "In Progress",
      submittedAt: new Date("2024-05-10T09:30:00Z"),
      reviewer: "Prof. Adams",
    },
    {
      id: 3,
      code: "REV-003",
      title: "Topology and Its Applications",
      lastOpened: "2024-06-03T16:45:00Z",
      progress: "80%",
      status: "In Progress",
      submittedAt: new Date("2024-05-15T11:15:00Z"),
      reviewer: "Dr. Brown",
    },
  ];
}

export async function getStats() {
  return [
    {
      title: "Submitted Articles",
      icon: (
        <Icon color="fg.muted" size='lg'>
          <MdOutlineLibraryBooks />
        </Icon>
      ),
      value: compactNumber(7),
    },
    {
      title: "Pending Reviews",
      icon: (
        <Icon color="fg.muted" size='lg'>
          <FaClockRotateLeft />
        </Icon>
      ),
      value: compactNumber(300),
    },
    {
      title: "Reviewed and Approved",
      icon: (
        <Icon color="fg.muted" size='lg'>
          <FaUserClock />
        </Icon>
      ),
      value: compactNumber(10),
    }
  ];
}

export default ReviewerDashboard;
