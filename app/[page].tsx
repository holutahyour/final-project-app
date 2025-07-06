import Image from "next/image";
import { Button } from "@/components/ui/sdcn-button";
import SideNav from "@/components/app/side-nav";

import {
  columns,
  Payment,
} from "@/app/_students/_component/studentTable/Columns";
import { DataTable } from "@/components/ui/sdcn-data-table";
import DashboardPageContainer from "@/components/app/dashboard-page-container";
import apiHandler from "@/data/api/ApiHandler";
import { StudentTableColumns2 } from "@/app/_students/_component/studentColumn";
import { IStudent } from "@/data/interface/IStudent";

// Ensure that the return type of getStudentData is correctly defined
const getStudentData = async (): Promise<IStudent[]> => {
  const Info = await apiHandler.students.list();
  return Info?.content ?? [];
};

export default async function Home() {
  const data = await getStudentData();

  return (
    <DashboardPageContainer>
      <p className="font-semibold text-bodyText-100 mb-[2.75rem]">
        School Name
      </p>
      <div className="flex flex-wrap gap-10">
        <div className="flex w-[30rem] 2xl:w-[36rem] h-[9.6rem] ">
          <div className="w-[7.8rem] bg-[#CDD4CD] flex justify-center items-center">
            <Image
              src={"/assets/icons/Student-icon.svg"}
              alt="educate logo"
              height={40}
              width={40}
            />
          </div>
          <div className="mt-[1.05rem] ml-[2rem]">
            <p className="text-bodyText-100 text-[1.65rem] font-medium">
              Students Enrolled
            </p>
            <p className="mt-[2.4rem] font-extrabold text-[2.4rem] text-black-100">
              4000
            </p>
          </div>
        </div>
        <div className="flex w-[30rem] 2xl:w-[36rem]  h-[9.6rem] ">
          <div className="w-[7.8rem] bg-[#CDD4CD] flex justify-center items-center">
            <Image
              src={"/assets/icons/Faculty-icon.svg"}
              alt="educate logo"
              height={40}
              width={40}
            />
          </div>
          <div className="mt-[1.05rem] ml-[2rem]">
            <p className="text-bodyText-100 text-[1.65rem] font-medium">
              Faculties
            </p>
            <p className="mt-[2.4rem] font-extrabold text-[2.4rem] text-black-100">
              24
            </p>
          </div>
        </div>
        <div className="flex w-[30rem] 2xl:w-[36rem]  h-[9.6rem] ">
          <div className="w-[7.8rem] bg-stroke-1 flex justify-center items-center ">
            <Image
              src={"/assets/icons/Department-icon.svg"}
              alt="educate logo"
              height={40}
              width={40}
            />
          </div>
          <div className="mt-[1.05rem] ml-[2rem]">
            <p className="text-bodyText-100 text-[1.65rem] font-medium">
              Department
            </p>
            <p className="mt-[2.4rem] font-extrabold text-[2.4rem] text-black-100">
              40
            </p>
          </div>
        </div>
        <div className="flex w-[30rem] 2xl:w-[36rem]  h-[9.6rem] ">
          <div className="w-[7.8rem] bg-indicatorBg-1 flex justify-center items-center">
            <Image
              src={"/assets/icons/Total-Program-icon.svg"}
              alt="educate logo"
              height={40}
              width={40}
            />
          </div>
          <div className="mt-[1.05rem] ml-[2rem]">
            <p className="text-bodyText-100 text-[1.65rem] font-medium">
              Total Programs
            </p>
            <p className="mt-[2.4rem] font-extrabold text-[2.4rem] text-black-100">
              40
            </p>
          </div>
        </div>
      </div>
      <div className="mt-[6.1rem] ml-[3.2rem]  w-[80vw] mb-[2rem]">
        <p className="font-bold mt-[1.2rem] ">Students List</p>
        {/* table components */}
        <DataTable columns={StudentTableColumns2} data={data} />
      </div>
    </DashboardPageContainer>
  );
}
