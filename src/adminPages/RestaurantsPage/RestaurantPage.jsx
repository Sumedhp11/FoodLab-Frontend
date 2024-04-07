import AdminSideBar from "../AdminSideBar";
import NavBar from "@/components/NavBar";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../users/DataTable";
import Loader from "@/loader";
import { adminRestaurantsList } from "./AdminRestaurantAPI";
import { columns } from "./Column";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import AddRestaurant from "../RestaurantList/AddRestaurant";

import { useEffect, useState } from "react";
import Pagination from "@/components/ui/Pagination";

const RestaurantPage = () => {
  const [TotalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const { data: restaurantsData, isLoading } = useQuery({
    queryKey: ["admin-restaurants", page],
    queryFn: () => adminRestaurantsList(page),
  });
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    setTotalPages(restaurantsData?.totalDocs);
  }, [restaurantsData?.totalDocs]);

  console.log("36", page);
  return (
    <div className="h-[100vh] overflow-y-hidden">
      <NavBar />
      <div className="flex gap-5">
        <AdminSideBar />
        <section className="flex w-full my-2 py-2 justify-center px-5 ">
          <div className="w-[90%]">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="my-2 text-3xl font-normal">All Restaurants</h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-green-700 hover:bg-green-800 my-2">
                      Add New Restaurant
                    </Button>
                  </DialogTrigger>
                  <DialogContent className=" h-fit overflow-auto max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Add Restaurant</DialogTitle>
                    </DialogHeader>
                    <AddRestaurant />
                  </DialogContent>
                </Dialog>
                <DataTable
                  columns={columns}
                  data={restaurantsData?.restaurants}
                />
                {TotalPages > 5 && (
                  <Pagination
                    page={page}
                    handlePage={handlePageChange}
                    totalProducts={TotalPages}
                  />
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RestaurantPage;
