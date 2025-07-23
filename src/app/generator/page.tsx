import { getRandomCat } from "../actions";
import CatCard from "../../components/catCard";

export default async function Generator() {
  const cat = await getRandomCat();

  return (
    <main className="main-container">
      <h1 className="h1">Here's a cat for you</h1>
      {cat && <CatCard cat={cat} />}
    </main>
  );
}
