import "../styles/globals.css";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import { UserContextProvider } from "../components/global/UserContext";

function AppWrapper({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <div className="h-screen flex flex-col justify-between bg-gray-50">
        <MainHeader />
        <Component {...pageProps} />
        <MainFooter />
      </div>
    </UserContextProvider>
  );
}

export default AppWrapper;
