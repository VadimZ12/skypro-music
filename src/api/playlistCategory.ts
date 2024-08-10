const apiUrl: string = "https://skypro-music-api.skyeng.tech/catalog/selection/";
export async function playlistCategory(id: string) {
  const response = await fetch(apiUrl + id);
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return response.json();
}