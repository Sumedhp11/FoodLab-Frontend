import NavBar from "@/components/NavBar";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../AdminAPI";
import Loader from "@/loader";
import DataTable from "../users/DataTable";
import { columns } from "./column";
import AdminSideBar from "../AdminSideBar";

const AdminOrdersPage = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: getAllOrders,
  });
  return (
    <div className=" min-h-screen ">
      <NavBar />
      <div className="flex gap-5">
        <AdminSideBar />
        <section className="flex w-full my-2 py-2 justify-center px-5">
          <div className="w-[90%]">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="my-4 text-3xl font-normal">All Orders</h1>

                <DataTable columns={columns} data={orders} />
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
