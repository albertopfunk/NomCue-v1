// import { useEffect, useState } from "react";
// import { useRouter } from 'next/router'
import { UserContextProvider } from "../components/global/UserContext";
import "../css/tailwind.css";

function AppWrapper({ Component, pageProps }) {
  // const [isRouteLoading, setIsRouteLoading] = useState(false)
  // const router = useRouter()

  // useEffect(() => {
  //   // setIsRouteLoading(false)
  //   router.events.on("routeChangeStart", () => {
  //     setIsRouteLoading(true)
  //   });
  //   router.events.on("routeChangeComplete", () => {
  //     setIsRouteLoading(false)
  //   });
  //   router.events.on("routeChangeError", () => {
  //     setIsRouteLoading(false)
  //   });

  //   return () => {
  //     router.events.off("routeChangeStart", () => {
  //       return;
  //     });
  
  //     router.events.off("routeChangeComplete", () => {
  //       return;
  //     });
  
  //     router.events.off("routeChangeError", () => {
  //       return;
  //     });
  //   }
  // })

  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default AppWrapper;
