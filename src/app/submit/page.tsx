import SubmitForm from "./submitForm";

export default async function Submit() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 pt-14">
      <h1 className="text-3xl font-bold mb-14">Submit Some Cuteness</h1>
      <SubmitForm />
    </main>
  );
}
