/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";

import EditRestaurant from "../RestaurantList/EditRestaurant";
import { deleteres } from "../AdminAPI";
export const columns = [
  {
    accessorKey: "id",
    header: "Sl No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "imageId",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-20 h-20">
        <img
          src={
            import.meta.env.VITE_APP_CLOUDINARY_IMAGE_URL + row.original.imageId
          }
          alt="ResImage"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Restaurant Name",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "cuisines",
    header: "Cuisines",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.cuisines + ","}
      </div>
    ),
  },
  {
    accessorKey: "slaString",
    header: "Delivery Time",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.slaString}
      </div>
    ),
  },
  {
    accessorKey: "costForTwo",
    header: "Cost For Two",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.costForTwo}
      </div>
    ),
  },
  {
    accessorKey: "avgRating",
    header: "Average Rating",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.avgRating} ⭐
      </div>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const { mutate: deleterestaurant } = useMutation({
        mutationFn: deleteres,
        onSuccess: () => queryClient.invalidateQueries("admin-restaurants"),
      });
      const handleDeleleRes = (resId) => {
        deleterestaurant({ resId });
      };
      return (
        <div className="flex gap-5">
          <Dialog>
            <DialogTrigger asChild>
              <button disabled={row.original.isdeleted}>
                <Pencil
                  className={
                    row.original.isdeleted ? "text-gray-400" : "text-green-700"
                  }
                />
              </button>
            </DialogTrigger>
            <DialogContent className=" h-fit overflow-auto max-w-3xl">
              <DialogHeader>
                <DialogTitle>Edit Restaurant</DialogTitle>
              </DialogHeader>
              <EditRestaurant
                restaurant={
                  (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button disabled={row.original.isdeleted}>
                          <Trash2
                            className={` ${
                              !row.original.isdeleted
                                ? "cursor-pointer text-red-700"
                                : "text-gray-600"
                            }`}
                            size={25}
                          />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription className="font-medium">
                          You want to Delete {row.original.name}?
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-700"
                            onClick={() => handleDeleleRes(row.original?._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ).original
                }
              />
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button disabled={row.original.isdeleted}>
                <Trash2
                  className={` ${
                    !row.original.isdeleted
                      ? "cursor-pointer text-red-700"
                      : "text-gray-600"
                  }`}
                  size={25}
                />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription className="font-medium">
                You want to Delete {row.original?.name}?
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-700"
                  onClick={() => handleDeleleRes(row.original?._id)}
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
