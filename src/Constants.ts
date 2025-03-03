import { IRegex } from "./Interfaces/IRegex";
import homeIcon from "./resources/homeIcon.png";
import rejected from "./resources/rejectedIcon.png";
export const API_URL = "https://api.example.com";

export const regex: IRegex = {
  name: /^[a-zA-Z]+$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  password: new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})`
  ),
};

export const lateralNavbarElements = [
  {
    label: "Inicio",
    link: "/homeAdmin",
    image: homeIcon,
    active: true,
  },
  {
    label: "Documentos Rechazados",
    link: "/admin/rejectedDocuments",
    image: rejected,
  },
];
