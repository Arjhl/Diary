"use client";
import { createContext, useContext } from "react";

type contextType = {
  userData: {
    id: string;
    email: string;
    username: string;
  };
  key: string;
};

const defaultValue: contextType = {
  userData: {
    id: "",
    email: "",
    username: "",
  },
  key: "",
};

export const UserContext = createContext(defaultValue);
