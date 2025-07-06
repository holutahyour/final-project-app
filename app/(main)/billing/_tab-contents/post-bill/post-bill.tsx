import { useEffect, useState } from "react";
import AppDataTable from "@/components/app/app-data-table";
import { columns } from "./_components/column";
import apiHandler from "@/data/api/ApiHandler";
import { IPostBill } from "@/data/interface/IPostBill";
import { useSearchParams } from "next/navigation";

function PostBill() {
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [data, setData] = useState<IPostBill[]>([]);
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  useEffect(() => {
    if (currentTab === "post-bills") {
      setTableLoader(true);
      getPostBillData().then((data) => {
        setData(data);
        setTableLoader(false);
      });
    }
  }, [currentTab]);

  return (
    <>
      <AppDataTable
        loading={tableLoader}
        columns={columns}
        data={data}
        title="Post Bills"
        filter="batchName"
        filterPlaceholder="Filter batch names..."
      />
    </>
  );
}

export default PostBill;

export async function getPostBillData() {
  const Info = await apiHandler.postBill.list();
  console.log("Post Bill Data:", Info?.content); 
  return Info?.content ?? [];
}