import { createContext } from "react";
import { THEMES } from "../constants/themes";

// Creamos el contexto asignando el valor por defecto a "light" mode
const Theme = createContext({
  // Valor actual
  current: THEMES.light,
  // Funcion para modificar el modo actual
  update: () => {}
});

export default Theme;