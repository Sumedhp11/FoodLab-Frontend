/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { deleteUserById } from "../AdminAPI";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const columns = [
  {
    accessorKey: "id",
    header: "Sl No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "orders",
    header: "Orders",
    cell: ({ row }) => <div>{row.original.orders.length}</div>,
  },
  {
    accessorKey: "isdeleted",
    header: "Action",
    cell: ({ row }) => {
      const queryClient = useQueryClient();

      const { mutate } = useMutation({
        mutationFn: deleteUserById,
        onSuccess: () => {
          queryClient.invalidateQueries("users");
        },
      });

      const deleteuser = (userId) => {
        mutate(userId);
      };

      return (
        <div>
          <AlertDialog>
            <AlertDialogTrigger disabled={row.original.isdeleted}>
              <Trash
                size={20}
                className={`${
                  row.original.isdeleted ? "text-gray-500" : "text-red-500"
                }`}
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
                <AlertDialogDescription className="font-normal">
                  This action cannot be undone. This will permanently delete
                  account .
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-700"
                  onClick={() => deleteuser(row.original.id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
