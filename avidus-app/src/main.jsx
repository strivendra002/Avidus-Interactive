import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

import App from "./App";
//import AppToaster from "./components/ui/toaster";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>
        <AuthProvider>
          <App />
          {/* <AppToaster /> */}
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
);
