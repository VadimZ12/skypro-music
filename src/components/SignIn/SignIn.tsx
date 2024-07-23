import Image from "next/image";
import styles from "./SignIn.module.css";
import cn from "classnames";
import Link from "next/link";

export const SignIn = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <form className={styles.modal__formLogin} action="#">
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
              name="login"
              placeholder="Почта"
            />
            <input
              className={cn(styles.modal__input, styles.password)}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <button className={styles.modal__btnEnter}>
              <Link href="/">Войти</Link>
            </button>
            <button className={styles.modal__btnSignup}>
              <Link href="/signup">Зарегистрироваться</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};