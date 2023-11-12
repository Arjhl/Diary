"use client";
import { createContext, useContext } from "react";

const defaultValue = {
  userData: {
    id: "",
    email: "",
    username: "",
  },
  key: "",
};

export const UserContext = createContext(defaultValue);
