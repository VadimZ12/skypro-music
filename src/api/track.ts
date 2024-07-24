const apiUrl: string = "https://skypro-music-api.skyeng.tech/catalog/track/";
export async function getTracks() {
  const response = await fetch(apiUrl + "all/");
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return response.json();
}