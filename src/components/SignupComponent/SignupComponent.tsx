"use client";
import Link from "next/link";
import styles from "./SignupComponent.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/store";
import { useState } from "react";
import { getSignup, getTokens, getUser } from "@/store/features/authSlice";

export default function SignupComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
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
      await Promise.all([dispatch(getSignup(formData)).unwrap()]).then(() => {
        Promise.all([
          dispatch(getTokens(formData)).unwrap(),
          dispatch(getUser(formData)).unwrap(),
        ]);
        router.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.modalBlock}>
      <form className={styles.modalFormLogin}>
        <Link href="/">
          <div className={styles.modalLogo}>
            <Image
              src="/img/logo_modal.png"
              alt="logo"
              width={140}
              height={21}
            />
          </div>
        </Link>
        <input
          className={styles.modalInput}
          type="text"
          name="email"
          placeholder="Почта"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className={styles.modalInput}
          type="text"
          name="username"
          placeholder="Логин"
          value={formData.username}
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
        {/* <input
          className={styles.modalInput}
          type="password"
          name="password"
          placeholder="Повторите пароль"
          value={formData.password}
          onChange={handleChange}
        /> */}
        <button onClick={handleSubmit} className={styles.modalBtnSignupEnt}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}