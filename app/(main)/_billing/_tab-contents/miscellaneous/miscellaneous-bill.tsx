import { useLayoutEffect, useState } from "react";
import AppDataTable from "@/components/app/app-data-table";
import { columns } from "./_components/column";
import apiHandler from "@/data/api/ApiHandler";
import { IMiscellaneousBill } from "@/data/interface/IMiscellaneousBill";

function MiscellaneousBill() {
  const [tableLoader, setTableLoader] = useState<boolean>(false);
  const [data, setData] = useState<IMiscellaneousBill[]>([]);

  useLayoutEffect(() => {
    setTableLoader(true);
    getMiscellaneousBillData().then((data) => {
      setData(data);
      setTableLoader(false);
    });
  }, []);

  return (
    <>
      <AppDataTable
        loading={tableLoader}
        columns={columns}
        data={data}
        title="Miscellaneous Bill"
        filter="name"
        filterPlaceholder="Filter account names..."
      />
    </>
  );
}

export default MiscellaneousBill;

export async function getMiscellaneousBillData() {
  const Info = await apiHandler.miscellaneousBill.list();
  return Info?.content ?? [];
}
