import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Cat } from "./page";

export default function CatCard({ cat }: { cat: Cat }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-14">Here's a cat for you</h1>
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square mx-auto p-4 flex flex-col items-center justify-center">
        <CardTitle className="text-center w-full mb-4">
          This is {cat?.name}
        </CardTitle>
        <CardContent className="flex-1 w-full flex items-center justify-center overflow-hidden">
          <img
            src={cat.image}
            alt={cat.name}
            className="w-full h-full object-contain"
          />
        </CardContent>
      </Card>
    </>
  );
}
