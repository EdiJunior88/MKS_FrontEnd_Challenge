"use client";

import React from "react";
import HomePage from "./home/page";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />;
    </QueryClientProvider>
  );
}
