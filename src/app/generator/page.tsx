import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { getRandomCat } from "../actions";
import { Label } from "@/components/ui/label";
import CatCard from "./catCard";

export type Cat = {
  id: number;
  name: string;
  image: string;
};

export default async function Generator() {
  const cat = await getRandomCat();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 pt-8">
      {cat && <CatCard cat={cat} />}
    </main>
  );
}
