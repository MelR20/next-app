'use server';

export async function handleSubmitForm(formData: FormData) {
    console.log("Form submitted");
    console.log(formData.get("name"));
    console.log(formData.get("image"));
}

