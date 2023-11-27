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
                  <img alt="" src="/images/icon-menu1.png" />
                </div>
                Inmuebles
              </Link>
              <Link
                href={pathname === "/contacts" ? "" : "/contacts"}
                className={pathname === "/contacts" ? styles.active : ""}
              >
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/icon-menu2.png" />
                </div>
                Contactos
              </Link>
              <a href="#">
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/icon-menu3.png" />
                </div>
                Dashboard
              </a>
              <a href="#">
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/icon-menu4.png" />
                </div>
                Oportunidades
              </a>
              <a href="#">
                <div className={styles.imageMenu}>
                  <img alt="" src="/images/icon-menu5.png" />
                </div>
                Perfil
              </a>
              <div className={styles.search}>
                <div
                  className={`${styles.glass} bg-ct`}
                  onClick={() => setShowFilter(true)}
                ></div>
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
