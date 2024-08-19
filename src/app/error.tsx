'use client';

import { useEffect } from 'react';
import styles from "./error.module.css"

type ErrorType ={
    error: Error,
    reset: () => void,
}

export default function Error({ error, reset }: ErrorType) {
  useEffect(() => {
    // Логирование ошибки
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorPage}>
      <h2 className={styles.errorTitle}>Что-то пошло не так!</h2>
      <button className={styles.buttonError} onClick={reset}>Попробовать снова</button>
    </div>
  );
}