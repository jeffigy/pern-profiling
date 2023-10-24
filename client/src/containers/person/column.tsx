"use client";

import { ColumnDef } from "@tanstack/react-table";

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
];
