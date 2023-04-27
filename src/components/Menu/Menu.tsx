import styles from "./Menu.module.scss";
import { Typography } from "@mui/material";
import React from "react";
import LanguageMenu from "./LanguageMenu/LanguageMenu";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import { Link } from "react-router-dom";

import AuthStore from "../../mobx/auth";
import { useTranslation } from "react-i18next";
const MenuBar = () => {
  const { t } = useTranslation();
  const { accessToken, logoutUser } = AuthStore;
  const isAuthorized = !!accessToken;

  return (
    <div className={styles.menu}>
      <div className={styles.container}>
        <div className={styles.menu__left}>
          <Typography className={styles.menu__left__header} variant={"h4"}>
            <Link to={"/"}>{t("Posts.LogoText")}</Link>
          </Typography>
        </div>
        <div className={styles.menu__right}>
          <LanguageMenu />
          {isAuthorized && <ProfileMenu logoutUser={logoutUser} />}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
