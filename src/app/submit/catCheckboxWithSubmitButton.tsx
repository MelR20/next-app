"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function CatCheckboxWithSubmitButton() {
  const [isCat, setIsCat] = useState(false);
  const [isAbleToSubmit, setIsAbleToSubmit] = useState(false);

  function handleCheckboxChange() {
    console.log("Checkbox changed");
    setIsCat(!isCat);
    setIsAbleToSubmit(!isAbleToSubmit);
  }

  return (
    <>
      <div className="flex items-center space-x-2 mb-6">
        <Checkbox
          name="isCat"
          checked={isCat}
          onCheckedChange={handleCheckboxChange}
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
    </>
  );
}
