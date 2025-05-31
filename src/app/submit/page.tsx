"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export type handleSubmit = {
  handleSubmit: (formData: FormData) => void;
};
export type handleCheckboxChange = {
  handleCheckboxChange: (isCat: boolean) => void;
};

export default function Submit() {
  const [isCat, setIsCat] = useState(false);
  const [isAbleToSubmit, setIsAbleToSubmit] = useState(false);

  function handleCheckboxChange() {
    console.log("Checkbox changed");
    setIsCat(!isCat);
    setIsAbleToSubmit(!isAbleToSubmit);
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.currentTarget === null) return;
    const formData = new FormData(event.currentTarget);
    console.log("Form submitted");
    console.log(formData.get("name"));
    console.log(formData.get("image"));
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-3xl font-bold mb-6">Submit Some Cuteness</h1>
      <form className="flex flex-col  justify-center" onSubmit={handleSubmit}>
        <Label id="nameLabel" className="mr-4 pb-4 mb-4">
          Name
          <Input
            name="name"
            type="text"
            placeholder="Name"
            className="flex-1/2"
          />
        </Label>

        <Label id="imageLabel" className="mr-4 pb-4 mb-4">
          Upload photo
          <Input name="image" type="file" className="flex-1/2" />
        </Label>

        <div className="flex items-center space-x-2 mb-6">
          <Checkbox
            name="isCat"
            checked={isCat}
            onCheckedChange={() => handleCheckboxChange()}
          />
          <p id="isCatText">I confirm this is a cat</p>
        </div>
        <div className="flex items-center justify-center mb-6">
          <Button
            id="submitButton"
            type="submit"
            className="w-1/2"
            disabled={!isAbleToSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
}
