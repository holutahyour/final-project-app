"use client";

import { useEffect, useState } from "react";
import AppDataTable from "@/components/app/app-data-table";
import apiHandler from "@/data/api/ApiHandler";
import { IFeePaymentByDate } from "@/data/interface/IFeePaymentByDate";
import { processExcelFile } from "@/lib/utils";
import { columns } from "./_components/column";
import { useSearchParams } from "next/navigation";

function PendingFeePayments() {
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [data, setData] = useState<IFeePaymentByDate[]>([]);
  const currentTab = useSearchParams().get("tab");

  useEffect(() => {
    if (currentTab === "pending-fee-payments") {
      setTableLoader(true);
      getPendingFeePaymentsData().then((data) => {
        setData(data);
        setTableLoader(false);
      });
    }
  }, [currentTab]);

  const handleImport = (acceptedFiles: File[]) => {
    setTableLoader(true);

    const file = acceptedFiles[0];

    if (file) {
      processExcelFile(file, (data) => {
        console.log(data);
        apiHandler.feePayment
          .import(data)
          .then((data) => {
            setData(data);
            setTableLoader(false);
          })
          .catch((error) => {
            console.error(error);
            setTableLoader(false);
          });
      });
    }
  };

  return (
    <>
      <AppDataTable
        loading={tableLoader}
        columns={columns}
        onImport={handleImport}
        data={data}
        title="Pending Payments"
        filter="studentCode"
        filterPlaceholder="Filter Student Code names..."
      />
    </>
  );
}

export default PendingFeePayments;

export async function getPendingFeePaymentsData() {
  const Info = await apiHandler.feePayment.by_dates();
  return Info?.content ?? [];
}
