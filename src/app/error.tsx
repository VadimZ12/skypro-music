"use client";
import { useEffect } from "react";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Логирование ошибки
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Что-то пошло не так!</h2>
      <button className={styles.button} onClick={reset}>
        Попробовать снова
      </button>
    </div>
  );
}