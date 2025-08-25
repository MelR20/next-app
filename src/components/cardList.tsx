"use client";
import { Cat } from "@/types/Cat";
import CuteCard from "./cuteCard";

interface Props {
  cats: Cat[];
}

export default function CardList({ cats }: Props) {
  //Extraire eventuellement pour rendre le composant plus générique

  return (
    <>
      {cats?.map((cat: Cat) => (
        <CuteCard key={cat.id} cat={cat} size="small" />
      ))}
    </>
  );
}
