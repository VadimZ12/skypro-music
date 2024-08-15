const apiUrl: string = "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/";
export const setLike = async (token: string, id: number) => {
  const response = await fetch(apiUrl + id + "/favorite/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  const responseData = await response.json();
  return responseData.data;
};

export const setDisLike = async (token: string, id: number) => {
  const response = await fetch(apiUrl + id + "/favorite/", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  const responseData = await response.json();
  return responseData.data;
};