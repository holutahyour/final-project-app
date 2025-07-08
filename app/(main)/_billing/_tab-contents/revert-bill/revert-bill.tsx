"use client";

import { useEffect, useState, useCallback } from "react";
import AppDataTable from "@/components/app/app-data-table";
import apiHandler from "@/data/api/ApiHandler";
import { ITransactionBatch } from "@/data/interface/ITransactionBatch";
import { getColumns } from "./_components/column";
import { useSearchParams } from "next/navigation";

function RevertBills() {
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [data, setData] = useState<ITransactionBatch[]>([]);
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const reloadData = useCallback(async () => {
    setTableLoader(true);
    const fetched = await getRevertBillData();
    setData(fetched);
    setTableLoader(false);
  }, []);

  useEffect(() => {
    if (currentTab === "revert-bills") {
      reloadData();
    }
  }, [currentTab, reloadData]);

  return (
    <AppDataTable
      loading={tableLoader}
      columns={getColumns(reloadData)}
      data={data}
      title="Revert Bills"
      filter="batchName"
      filterPlaceholder="Filter batch names..."
    />
  );
}

export default RevertBills;

export async function getRevertBillData() {
  const Info = await apiHandler.revertBill.list();
  return Info?.content ?? [];
}
