import { Suspense } from "react";
import Loader from "./Loader";

interface SuspenseWrapperProps {
  children: React.ReactNode;
}

export default function SuspenseWrapper({ children }: SuspenseWrapperProps) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
