"use client";
import { useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(new QueryClient());
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={storeRef.current.__persistor}>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
