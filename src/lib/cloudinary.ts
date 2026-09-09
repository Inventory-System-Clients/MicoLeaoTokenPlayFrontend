const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "docrd6tkk";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "MicoLeao";

// Upload direto do navegador pro Cloudinary usando um upload preset
// "unsigned" (nao precisa de API secret no frontend). Mesma integracao
// usada no projeto de gestao (utils/cloudinary.js).
export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Falha ao enviar imagem para o Cloudinary");
  }

  const data = await response.json();
  return data.secure_url as string;
}
