import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import reducers from "./reducers"
import { persistStore } from "redux-persist"

// CREATING INITIAL STORE
export default (initialState) => {
  // let store

  // const isClient = typeof window !== "undefined"

  // if (isClient) {
  //   const { persistReducer } = require("redux-persist")
  //   const storage = require("redux-persist/lib/storage").default

  //   const persistConfig = {
  //     key: "root",
  //     storage,
  //   }

  //   store = createStore(
  //     persistReducer(persistConfig, reducers),
  //     initialState,
  //     applyMiddleware(thunkMiddleware)
  //   )

  //   store.__PERSISTOR = persistStore(store)
  // } else {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
  // }

  // IF REDUCERS WERE CHANGED, RELOAD WITH INITIAL STATE
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const createNextReducer = require("./reducers").default

      store.replaceReducer(createNextReducer(initialState))
    })
  }

  return store
}
