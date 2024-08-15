import { SigninFormType } from "@/types/types";

const apiUrl: string = "https://webdev-music-003b5b991590.herokuapp.com/user/";


export const fetchUser = async ({ email, password }: SigninFormType) => {
  const response = await fetch(apiUrl + "login/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // if (response.status === 400) {
  //   throw new Error("Неверный логин или пароль");
  // } else if (!response.ok) {
  //   throw new Error("Заполните поля");
  // }
  if (response.status === 400) {
    const error = await response.json();
    let errorMessage = "";
    for (const key in error) {
      errorMessage += error[key][0];
    }
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
  else if (response.status === 401) {
     throw new Error("Пользователь с таким email или паролем не найден");
  }
  const responseData = await response.json();
  return responseData;
};

export const fetchTokens = async ({ email, password }: SigninFormType) => {
  const response = await fetch(apiUrl + "token/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // if (response.status === 400) {
  //   throw new Error("Неверный токен");
  // } else if (!response.ok) {
  //   throw new Error("Заполните поля");
  // }
  if (response.status === 400) {
    const error = await response.json();
    let errorMessage = "";
    for (const key in error) {
      errorMessage += error[key][0];
    }
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
  else if (response.status === 401) {
    const error = await response.json();
    throw new Error(error.detail);
  }
  const responseData = await response.json();
  return responseData;
};

export const fetchAuthorization = async ({
  email,
  password
}: SigninFormType) => {
  const response = await fetch(apiUrl + "signup/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username: email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    let errorMessage = "";
    for (const key in error) {
      errorMessage += error[key][0];
    }
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
  const responseData = await response.json();
  return responseData;
};