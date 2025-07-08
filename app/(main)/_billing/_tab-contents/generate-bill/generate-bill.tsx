"use client";

import { useEffect, useState, useCallback } from "react";
import AppDataTable from "@/components/app/app-data-table";
import apiHandler from "@/data/api/ApiHandler";
import { IAcademicDepartment } from "@/data/interface/IAcademicDepartment";
import { getColumns } from "./_components/column";
import { useSearchParams } from "next/navigation";

function GenerateBills() {
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [data, setData] = useState<IAcademicDepartment[]>([]);
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const reloadData = useCallback(async () => {
    setTableLoader(true);
    const fetched = await getDepartmentsData();
    setData(fetched);
    setTableLoader(false);
  }, []);

  // useEffect(() => {
  //   reloadData();
  // }, [reloadData]);

  useEffect(() => {
    {
      reloadData();
    }
  }, [reloadData]);

  return (
    <AppDataTable
      loading={tableLoader}
      columns={getColumns(reloadData)}
      data={data.sort((a, b) => a.facultyCode.localeCompare(b.facultyCode))}
      title="Generate Bills"
      filter=""
      filterPlaceholder="Filter..."
    />
  );
}

export default GenerateBills;

export async function getDepartmentsData() {
  const Info = await apiHandler.academicDepartments.list();
  return Info?.content ?? [];
}
