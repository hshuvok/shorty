import Image from "next/image";
import { SearchUI } from "@/components/home/search/search-ui";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <section className="w-full py-6">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <SearchUI />
        </div>
      </section>
    </div>
  );
}
