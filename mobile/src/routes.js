import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

// **********************PAGINAS

import Login from "./pages/Login";
import List from "./pages/List";
import Book from "./pages/Book";

// **********************PAGINAS

const Routes = createAppContainer(createSwitchNavigator({ Login, List, Book }));
export default Routes;
