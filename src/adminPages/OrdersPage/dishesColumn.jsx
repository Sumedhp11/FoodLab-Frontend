/* eslint-disable react-hooks/rules-of-hooks */

export const dishescolumns = [
  {
    accessorKey: "id",
    header: "Sl No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "dish",
    header: "Dish Image",
    cell: ({ row }) => (
      <div className="w-20 h-20">
        <img
          className="w-full h-full object-cover"
          src={import.meta.env.VITE_APP_IMAGE_URL + row.original.dish.image}
          alt=""
        />
      </div>
    ),
  },
  {
    accessorKey: "dish",
    header: "Name",
    cell: ({ row }) => <div>{row.original.dish.name}</div>,
  },
  {
    accessorKey: "dish",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.quantity}</div>,
  },
  {
    accessorKey: "dish",
    header: "Price",
    cell: ({ row }) => <div>₹ {row.original.dish.mrp / 100}</div>,
  },
];
