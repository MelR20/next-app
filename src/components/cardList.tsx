"use client";
import { Cat } from "@/types/Cat";
import CatCard from "./catCard";
import { useQuery } from "@tanstack/react-query";

function getCats(page: number, pageSize: number) {
  return fetch(`/api/cats?page=${page}&pageSize=${pageSize}`).then((res) =>
    res.json()
  );
}

export default function CardList({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  //Extraire eventuellement pour rendre le composant plus générique
  const response = useQuery({
    queryKey: ["cats", page, pageSize],
    queryFn: () => getCats(page, pageSize),
  });

  const cats = response.data?.data || [];
  return (
    <>
      {cats.map((cat: Cat) => (
        <CatCard key={cat.id} cat={cat} size="small" />
      ))}
    </>
  );
}
