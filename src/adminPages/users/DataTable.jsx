/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export default function DataTable({ data, columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className=" rounded-md overflow-hidden">
      <TableHeader className="bg-[#F3F4F6] ">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  className="text-muted-foreground border-b-[0.8px] border-gray-400 text-black text-base font-medium whitespace-nowrap"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: 1,
                y: 1,
                animationDuration: "3s",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{
                delay: index * 0.2,
                ease: "easeInOut",
              }}
              className={`border-b-[0.8px] border-gray-400 py-2 text-sm ${
                row.original.isdeleted ? "bg-gray-300 rounded" : ""
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell className="font-semibold" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </motion.tr>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
