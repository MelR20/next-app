import { getRandomCat } from "../actions";
import CatCard from "./catCard";

export default async function Generator() {
  const cat = await getRandomCat();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 pt-14">
      {cat && <CatCard cat={cat} />}
    </main>
  );
}
