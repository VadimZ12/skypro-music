const apiUrl: string = "https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/";
export async function playlistCategory(id: string) {
  const response = await fetch(apiUrl + id);
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return response.json();
}