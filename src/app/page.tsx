import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1>Hi</h1>
      <Button asChild variant="default">
        <Link href="/submit">Submit Cuteness</Link>
      </Button>
    </main>
  );
}
