import "@/styles/globals.css";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar/Navbar";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Condition to check if we're on the home page
  const isHomePage = router.pathname === "/";

  return (
    <>
      {!isHomePage && <Navbar />} {/* Navbar won't show on the home page */}
      <Component {...pageProps} />
    </>
  );
}
