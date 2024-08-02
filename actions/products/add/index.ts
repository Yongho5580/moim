"use server";

export async function uploadProduct(formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    location: formData.get("location"),
    photo: formData.get("photo"),
  };
}
