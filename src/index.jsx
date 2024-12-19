import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationProvider";
import { ActorProvider } from "./context/ActorProvider";
import { AuthorProvider } from "./context/AuthorProvider";
import { CharacterProvider } from "./context/CharacterProvider";
import { CategoriesProvider } from "./context/CategoriesProvider";
import { PlansProvider } from "./context/PlansProvider";
import ModalTest from "./pages/admin/media_management/movie/ModalTest";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  {/* <ModalTest></ModalTest> */}
    <NotificationProvider>
      <BrowserRouter>
        <CategoriesProvider>
          <CharacterProvider>
            <AuthorProvider>
              <ActorProvider>
                <PlansProvider>
                  <App />
                </PlansProvider>
              </ActorProvider>
            </AuthorProvider>
          </CharacterProvider>
        </CategoriesProvider>
      </BrowserRouter>
    </NotificationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
