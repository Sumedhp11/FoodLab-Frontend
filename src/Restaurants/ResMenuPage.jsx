import NavBar from "@/components/NavBar";

import { useParams } from "react-router-dom";

import ResCard from "./ResCard";
import ResMenu from "./ResMenu";

const ResMenuPage = () => {
  const { resId } = useParams();

  return (
    <div className="min-h-screen">
      <NavBar />
      <section className="w-full h-full flex justify-center">
        <div className="w-[80%] px-3 py-16 h-full  space-y-5">
          <ResCard resId={resId} />
          <ResMenu resId={resId} />
        </div>
      </section>
    </div>
  );
};

export default ResMenuPage;
