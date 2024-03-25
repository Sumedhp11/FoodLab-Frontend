/* eslint-disable react-hooks/rules-of-hooks */

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateDeliveryStatus } from "../AdminAPI";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import DataTable from "../users/DataTable";
import { dishescolumns } from "./dishesColumn";

export const columns = [
  {
    accessorKey: "id",
    header: "Sl No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "userId",
    header: "Name",
    cell: ({ row }) => <div>{row.original.userId.name}</div>,
  },
  {
    accessorKey: "dishes",
    header: "Dishes",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <div className="px-1 rounded-md py-3 bg-green-700 text-white flex justify-center items-center w-[40%] cursor-pointer hover:bg-green-800">
            <p className="font-semibold text-base">
              {row.original.dishes.length}
            </p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[50%]">
          <DataTable columns={dishescolumns} data={row.original.dishes} />
        </DialogContent>
      </Dialog>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <div>₹ {row.original.amount / 100}</div>,
  },

  {
    accessorKey: "address",
    header: "Delivery Address",
    cell: ({ row }) => (
      <div className="text-wrap w-36">
        {`${row.original.address.flatno}, ${row.original.address.streetName}, ${row.original.address.landmark}, ${row.original.address.city}, ${row.original.address.state}, ${row.original.address.pincode}`}
      </div>
    ),
  },

  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <div className="text-green-600 font-medium text-base">
        {row.original.paymentStatus.charAt(0).toUpperCase() +
          row.original.paymentStatus.slice(1)}
      </div>
    ),
  },
  {
    accessorKey: "deliveryStatus",
    header: "Delivery Status",
    cell: ({ row }) => {
      const queryClient = useQueryClient();

      const { mutate } = useMutation({
        mutationFn: updateDeliveryStatus,
        onSuccess: () => {
          queryClient.invalidateQueries("all-orders");
        },
      });
      const handleStatusChange = (orderId, deliveryStatus) => {
        mutate({ orderId: orderId, deliveryStatus: deliveryStatus });
      };

      return (
        <div className="">
          <Select
            onValueChange={(data) => handleStatusChange(row.original.id, data)}
          >
            <SelectTrigger className="w-[70%] border border-black  text-orange-700 focus:outline-none">
              <SelectValue
                placeholder={
                  row.original.deliveryStatus.charAt(0).toUpperCase() +
                  row.original.deliveryStatus.slice(1)
                }
              />
            </SelectTrigger>
            <SelectContent className="border border-black">
              <SelectGroup>
                <SelectItem
                  value="shipped"
                  className="border-b-[0.8px] border-black font-medium text-yellow-700 cursor-pointer"
                >
                  Shipped
                </SelectItem>
                <SelectItem
                  value="delivered"
                  className="border-b-[0.8px] border-black font-medium text-green-700 cursor-pointer"
                >
                  Delivered
                </SelectItem>
                <SelectItem
                  value="cancelled"
                  className="border-b-[0.8px] border-black font-medium text-red-700 cursor-pointer"
                >
                  Cancel
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
];
