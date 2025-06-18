import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CatCheckboxWithSubmitButton from "./catCheckboxWithSubmitButton";

async function handleSubmitForm(formData: FormData) {
  "use server";
  console.log("Form submitted");
  console.log(formData.get("name"));
  console.log(formData.get("image"));
}

export default function SubmitForm() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-3xl font-bold mb-6">Submit Some Cuteness</h1>
      <form className="flex flex-col  justify-center" action={handleSubmitForm}>
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
        <CatCheckboxWithSubmitButton />
      </form>
    </div>
  );
}
