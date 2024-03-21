import styles from '../styles/Login.module.css';
import LogInComponent from '../components/login';

const LogIn = () => {
  return (
    <section className={styles['main-container']}>
      <div className={styles.background}>
        <div className={styles['login-box']}>
          <div className={styles['logo-white']}></div>
          <LogInComponent />
        </div>
      </div>
    </section>
  );
};

export default LogIn;
