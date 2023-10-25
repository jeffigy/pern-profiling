"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
// import { Button } from "react-day-picker";
import { Button } from "@/components/ui/button";
import EditPerson from "./EditPerson";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  person_id: string;
  person_fname: string;
  person_lname: string;
  person_bday: number;
  person_sex: string;
  person_address: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "person_id",
    header: "ID",
  },
  {
    accessorKey: "person_fname",
    header: "First Name",
  },
  {
    accessorKey: "person_lname",
    header: "Last Name",
  },
  {
    accessorKey: "person_bday",
    header: "Birthday",
  },
  {
    accessorKey: "person_sex",
    header: "Sex",
  },
  {
    accessorKey: "person_address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row;
      return <EditPerson data={data} />;
    },
  },
];
