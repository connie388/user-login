import React, { useContext } from "react";
import AuthAppl from "./AuthAppl";
import PublicAppl from "./PublicAppl";
import { DataContext } from "../helpers/DataProvider";

const MenuHeader = () => {
  const [authenticate] = useContext(DataContext);

  return <>{authenticate ? <AuthAppl /> : <PublicAppl />}</>;
};

export default MenuHeader;
