import Link from "next/link";
import React, { useState } from "react";
import styles from "./header.module.css";
import Filter from "../filter";
import AdvancedFilter from "../advancedFilter";
import { useRouter } from "next/router";

const Header = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      <header className={styles.siteHeader}>
        <div className={`${styles.containerHeader}`}>
          <div className={styles.logo}>
            {pathname !== "/" && (
              <Link href="/">
                <img src="/images/logo-white.png" alt="Logo BILD" />
              </Link>
            )}
            {pathname === "/" && (
              <img src="/images/logo-white.png" alt="Logo BILD" />
            )}
          </div>

          <div className={`${styles["menu-top"]} `}>
            <div className={styles.menuPpal}>
              <Link
                href={pathname === "/" ? "" : "/"}
                className={pathname === "/" ? styles.active : ""}
              >
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/header/building.png" />
                </div>
                Inmuebles
              </Link>
              <Link
                href={pathname === "/contacts" ? "" : "/contacts"}
                className={pathname === "/contacts" ? styles.active : ""}
              >
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/header/phone.png" />
                </div>
                Contactos
              </Link>
              <Link
                href={pathname === "/dashboard" ? "" : "/dashboard"}
                className={pathname === "/dashboard" ? styles.active : ""}
              >
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/header/dashboard.png" />
                </div>
                Dashboard
              </Link>
              <a href="#">
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/header/key.png" />
                </div>
                Oportunidades
                <div className={styles.smallNumber}>5</div>
              </a>
              <Link
                href={pathname === "/profile" ? "" : "/profile"}
                className={pathname === "/profile" ? styles.active : ""}
              >
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/header/person.png" />
                </div>
                Perfil
              </Link>
              <div
                className={styles.search}
                onClick={() => setShowFilter(true)}
              >
                <div className={`${styles.glass} bg-ct`}></div>
              </div>
              
            </div>
          </div>
        </div>
      </header>
      <Filter show={showFilter} setShowFilter={setShowFilter} />
      <AdvancedFilter show={showAdvancedFilter} setShowFilter={setShowAdvancedFilter} />
 

    </>
  );
};

export default Header;
