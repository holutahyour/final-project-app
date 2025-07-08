"use client"

import AppTabs from "@/components/app/app-tabs";
import { BILLING } from "@/lib/routes";
import { LuAward, LuBookOpen, LuBriefcase, LuBuilding2 } from "react-icons/lu";
import GenerateBill from "./_tab-contents/generate-bill/generate-bill";
import PostBill from "./_tab-contents/post-bill/post-bill";
import RevertBill from "./_tab-contents/revert-bill/revert-bill";
import { withAuth } from "@/lib/withAuth";

function BillingPage() {
    return (
        <>
            <AppTabs tabs={tabs} route={BILLING} defaultValue="generate-bills" />
        </>
    );
}

export default BillingPage

// export default withAuth(BillingPage, ["Billing-Accountant",'Admin']);

export const tabs = [
    {
        label: "Generate Bills",
        value: "generate-bills",
        Icon: LuBookOpen,
        content: <GenerateBill />
    },
    {
        label: "Revert Bills",
        value: "revert-bills",
        Icon: LuBuilding2,
        content: <RevertBill />
    },
    {
        label: "Post Bills",
        value: "post-bills",
        Icon: LuAward,
        content: <PostBill />
    },
    // {
    //     label: "All Payments",
    //     value: "fee-payments",
    //     Icon: LuBriefcase,
    //     content: <FeePayments />
    // },
    // {
    //     label: "Pending Payments",
    //     value: "pending-fee-payments",
    //     Icon: LuBriefcase,
    //     content: <PendingFeePayments />
    // },
];
