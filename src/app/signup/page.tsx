import SignupComponent from "@/components/SignupComponent/SignupComponent";
import styles from "./signup.module.css";

export default function SignUp() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <SignupComponent />
      </div>
    </div>
  );
}