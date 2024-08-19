import { SigninFormType, SignupFormType } from "@/components/types";

const apiUrl = "https://webdev-music-003b5b991590.herokuapp.com/user/";
export const fetchUser = async ({ email, password }: SigninFormType) => {
  const response = await fetch(apiUrl + `login/`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 401) {
    throw new Error("Неверный логин или пароль");
  } else {
    if (!response.ok) {
      throw new Error("Заполните поля");
    }
  }
  const responseData = await response.json();
  return responseData;
};

export const fetchTokens = async ({ email, password }: SigninFormType) => {
  const response = await fetch(apiUrl + `token/`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 401) {
    throw new Error("Неверный логин или пароль");
  } else {
    if (!response.ok) {
      throw new Error("Заполните поля");
    }
  }
  const responseData = await response.json();
  return responseData;
};

export const refreshToken = async (refresh: string) => {
  const response = await fetch(apiUrl + "token/refresh/", {
    method: "POST",
    body: JSON.stringify({
      refresh,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.status === 401) {
    throw new Error("Refresh токен невалидный");
  } else if (response.status === 400) {
    throw new Error("В теле запроса не передан refresh токен");
  } else if (response.status === 500) {
    throw new Error("Сервер сломался");
  }
  const responseData = await response.json();
  return responseData;
};

export const fetchSignup = async ({
  email,
  username,
  password,
}: SignupFormType) => {
  const response = await fetch(apiUrl + "signup/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.status === 403) {
    throw new Error("Введенный Email уже занят");
  } else if (response.status === 500) {
    throw new Error("Сервер сломался");
  }
  const responseData = await response.json();
  return responseData;
};