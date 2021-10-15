import "tailwindcss/tailwind.css";
import MainHeader from "../components/MainHeader";
import { UserContextProvider } from "../components/global/UserContext";

function AppWrapper({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <div className="h-screen bg-gray-50">
        <MainHeader />
        <Component {...pageProps} />
        <footer>
          <div>NomCue inc.</div>
        </footer>
      </div>
    </UserContextProvider>
  );
}

export default AppWrapper;
