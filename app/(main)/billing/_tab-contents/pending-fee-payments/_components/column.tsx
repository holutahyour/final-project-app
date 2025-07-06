"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/app/app-data-table/data-table-column-header";
import { IFeePaymentByDate } from "@/data/interface/IFeePaymentByDate";
import { Button } from "@chakra-ui/react";
import apiHandler from "@/data/api/ApiHandler";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<IFeePaymentByDate>[] = [
  {
    accessorKey: "paymentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Date" />
    ),
    cell: ({ row }) => {
      const value = row.original;

      return (
        <p>
          {new Date(value.paymentDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => {
      const value = row.original;

      const formattedNaira = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      }).format(value.totalAmount);

      return <span className="text-xs font-semibold">{formattedNaira}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ActionCell = () => {
        const value = row.original;

        // const handleBillCommit = () => {
        //     var promise = apiHandler.transactions.generate_and_commit_bill(value.code as string)
        //     .then((response) => {
        //         window.location.reload();
        //     })

        //     toaster.promise(promise, {
        //         success: {
        //             title: `${value.name} Bill committed successfully`,
        //             description: "Looks great",
        //         },
        //         error: {
        //             title: "Failed to commit bill",
        //             description: "Something wrong with the commit",
        //         },
        //         loading: { title: "committing...", description: "Please wait" },
        //     })
        // }

        return (
          <div className="flex items-center justify-end">
            <Button
              //onClick={handleBillCommit}
              //disabled={value.isCommited}
              className="bg-primary my-1 rounded-sm"
              size="xs"
            >
              Post Payments
            </Button>
          </div>
        );
      };

      return <ActionCell />;
    },
    size: 1,
  },
];
