import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance pb-12">
        Welcome to the Cuteness Generator !
      </h1>
      <h2 className="text-center text-2xl font-semibold pb-6">
        What do you want to do?
      </h2>
      <div className="flex space-x-4">
        <Button asChild variant="default">
          <Link href="/submit">Submit Cuteness</Link>
        </Button>
        <h2 className="text-center text-2xl font-semibold pb-6">or</h2>
        <Button asChild>
          <Link href="/generator">Generate Cuteness</Link>
        </Button>
      </div>
    </main>
  );
}
