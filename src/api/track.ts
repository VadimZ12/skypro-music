const apiUrl: string = "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/"
export async function getTracks() {
  const response = await fetch(apiUrl + "all/");
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return response.json();
}

export const fetchFavoriteTracks = async (access: string) => {
  const response = await fetch(apiUrl + "favorite/all/", {
    headers: {
      Authorization: `Bearer ${access}`,
    },
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const responseData = await response.json();
  return responseData.data;
};