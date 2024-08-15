import styles from "./layout.module.css";
import { Player } from "@/components/Player/Player";
import Header from "@/components/Header/Header";
export default function TracksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Header />
          {children}
        </main>
        <Player />
        <footer className={styles.footer} />
      </div>
    </div>
  );
}