import ReactQueryProvider from "../ReactQueryProvider";
import CatList from "@/components/catList";

export default async function Cats() {
  return (
    <main className="main-container">
      <h1 className="h1">All the Cuteness</h1>

      <ReactQueryProvider>
        <CatList />
      </ReactQueryProvider>
    </main>
  );
}
