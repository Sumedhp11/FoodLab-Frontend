/* eslint-disable react/prop-types */
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Pagination({ page, handlePage, totalProducts }) {
  const totalPage = totalProducts;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 my-3 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          onClick={() => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => handlePage(page < totalPage ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page - 1) * 5 + 1}</span> to{" "}
            <span className="font-medium">
              {page * 5 < totalProducts ? page * 5 : totalProducts}
            </span>{" "}
            of <span className="font-medium">{totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={() => handlePage(page > 1 ? page - 1 : page)}
              className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {Array.from({
              length: totalPage,
            }).map((_, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => handlePage(idx + 1)}
                onKeyDown={() => handlePage(idx + 1)}
                aria-current="page"
                className={`relative cursor-pointer z-10 border border-border inline-flex items-center ${
                  idx + 1 === page ? "bg-primary text-white" : "text-gray-400"
                }  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handlePage(page < totalPage ? page + 1 : page)}
              className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
