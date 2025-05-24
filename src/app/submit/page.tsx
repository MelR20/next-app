import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Submit() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-3xl font-bold mb-6">Submit Some Cuteness</h1>
      <form className="flex flex-col  justify-center">
        <div className="flex items-center justify-center mb-4">
          <Label className="mr-4 pb-4"> Name </Label>
          <Input id="name" type="text" placeholder="Name" className="mb-4" />
        </div>
        <div className="flex items-center justify-center mb-4">
          <Label className="mr-4 pb-4"> Upload photo </Label>
          <Input id="image" type="file" className="mb-4" />
        </div>
        <div className="flex items-center space-x-2 mb-6">
          <Checkbox id="isCat" />
          <Label>I confirm this is a cat</Label>
        </div>
        <Button type="submit" className="">
          Submit
        </Button>
      </form>
    </main>
  );
}
