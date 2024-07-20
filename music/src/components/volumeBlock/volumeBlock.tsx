import styles from "./volumeBlock.module.css";
import classNames from "classnames";

export default function VolumeBlock() {
  return (
    <div className={styles.barVolumeBlock}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="/volume.svg"></use>
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, styles.btn)}>
          <input
            className={classNames(styles.volumeProgressLine, styles.btn)}
            type="range"
            name="range"
          />
        </div>
      </div>
    </div>
  );
}
