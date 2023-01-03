import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import App from "./App"
import "./App.scss"
import { store } from "./app/store"

const root = ReactDOM.createRoot(document.getElementById("root") as Element)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

/*TODO: Redux
1. Переделать запросы к api через redux

*/
