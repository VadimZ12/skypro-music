"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./SignUp.module.css";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/store";
import { useState } from "react";
import { getAuth, getTokens, getUser } from "@/store/features/authSlice";

export const SignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (formData.password === formData.repeatPassword) {
      try {
        await Promise.all([
          // dispatch(getTokens(formData)).unwrap(),
          dispatch(getAuth(formData)).unwrap(),
        ]);
        router.push("/signin");
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Пароли не совпадают");
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modal__block}>
          <form className={styles.modal__formLogin}>
            <Link href="/">
              <div className={styles.modal__logo}>
                <Image
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={140}
                  height={21}
                />
              </div>
            </Link>
            <input
              className={cn(styles.modal__input, styles.login)}
              type="text"
              name="email"
              placeholder="Почта"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              className={styles.modal__input}
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              className={styles.modal__input}
              type="password"
              name="repeatPassword"
              placeholder="Повторите пароль"
              value={formData.repeatPassword}
              onChange={handleChange}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button
              className={styles.modal__btnSignupEnt}
              onClick={handleSubmit}
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};