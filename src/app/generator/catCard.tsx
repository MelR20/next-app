"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Cat } from "@/types/Cat";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getRandomCat } from "../actions";

export default function CatCard({
  cat,
  size = "regular",
}: {
  cat: Cat;
  size?: "regular" | "small";
}) {
  const [CatGenerated, setCatGenerated] = useState<Cat>(cat);

  async function fetchCat() {
    const cat = await getRandomCat();
    if (cat) {
      setCatGenerated(cat);
    }
  }

  return (
    <>
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square mx-auto p-4 flex flex-col items-center justify-center">
        <CardTitle className="text-center w-full mb-4 text-xl">
          This is {CatGenerated.name}
        </CardTitle>
        <CardContent className="flex-1 w-full flex items-center justify-center overflow-hidden">
          <img
            src={CatGenerated.image}
            alt={CatGenerated.name}
            className="w-full h-full object-contain"
          />
        </CardContent>
      </Card>
      <Button className="mt-4" onClick={() => fetchCat()}>
        I want to see more please!
      </Button>
    </>
  );
}
