"use client"
import Link from "next/link";
import Image from "next/image";
import styles from "./LoginComponent.module.css";
import classNames from "classnames";
import { useState } from "react";
import { getTokens, getUser } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/store";
export default function LoginComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await Promise.all([
        dispatch(getTokens(formData)).unwrap(),
        dispatch(getUser(formData)).unwrap(),
      ]);
      router.push("/");
    } catch (error) {
      //выполнить вывод ошибки
      console.log(error);
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
            <Link href="/">
              <div className={styles.modalLogo}>
                 <Image src="/img/logo_modal.png" alt="logo"  width={140} height={21} />
              </div>
            </Link>
            <input
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="email"
              placeholder="Почта"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className={styles.modalInput}
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
            />
            <button className={styles.modalBtnEnter} onClick={handleSubmit}>
              Войти
            </button>
            <button className={styles.modalBtnSignup}>
              <a href="/signup">Зарегистрироваться</a>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}