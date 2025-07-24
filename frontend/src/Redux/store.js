import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
// This file is no longer needed since backend API is removed.

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [productApi.reducerPath]: productApi.reducer, // This line is removed
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( // This line is removed
      // productApi.middleware // This line is removed
    ),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)