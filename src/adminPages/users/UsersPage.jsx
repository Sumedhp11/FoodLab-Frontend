import NavBar from "@/components/NavBar";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../AdminAPI";

import { columns } from "./column";
import Loader from "@/loader";
import DataTable from "./DataTable";

const UsersPage = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <div className=" min-h-screen ">
      <NavBar />

      <section className="flex w-full my-2 py-2 justify-center px-5">
        <div className="w-[90%]">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <h1 className="my-4 text-3xl font-normal">All Users</h1>

              <DataTable columns={columns} data={users} />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default UsersPage;
