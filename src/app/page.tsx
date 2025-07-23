import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main className="main-container">
      <h1 className="h1">Welcome to the Cuteness Generator !</h1>
      <h2 className="h2">What do you want to do?</h2>
      <div className="flex space-x-4">
        <Button asChild variant="default">
          <Link href="/submit">Submit Cuteness</Link>
        </Button>
        <h2 className="h2">or</h2>
        <Button asChild>
          <Link href="/generator">Generate Cuteness</Link>
        </Button>
      </div>
      <div className="flex-col space-x-4 pt-4">
        <h2 className="h2">You can also</h2>
        <Button asChild>
          <Link href="/cats">See All the Cuteness</Link>
        </Button>
      </div>
    </main>
  );
}
