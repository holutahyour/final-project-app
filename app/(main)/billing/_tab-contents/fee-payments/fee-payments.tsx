import { useEffect, useState } from "react";
import AppDataTable from "@/components/app/app-data-table";
import apiHandler from "@/data/api/ApiHandler";
import { IFeePayment } from "@/data/interface/IFeePayment";
import { columns } from "./_components/column";
import { processExcelFile } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

function FeePayments() {
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [data, setData] = useState<IFeePayment[]>([]);
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  useEffect(() => {
    if (currentTab === "fee-payments") {
      setTableLoader(true);
      getFeePaymentsData().then((data) => {
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
        title="Fee Payments"
        filter="studentCode"
        filterPlaceholder="Filter Student Code names..."
      />
    </>
  );
}

export default FeePayments;

export async function getFeePaymentsData() {
  const Info = await apiHandler.feePayment.list();
  return Info?.content ?? [];
}
