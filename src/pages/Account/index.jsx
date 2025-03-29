import BasicTabs from "./components/BasicTabs";
import styles from "./Account.module.css";

export default function Account() {
  return (
    <div className={styles.container}>
      <div>
        <BasicTabs />
      </div>
    </div>
  );
}
