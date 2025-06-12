import Header from "../components/Header";
import MainContainer from "../components/MainContainer";
import LoaderOverlay from "../components/LoaderOverlay";
import Connection from "../components/Connection";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container-fluid main-container">
        <div className="row">
          <Connection />
          <MainContainer />
        </div>
      </div>
      <LoaderOverlay />
    </>
  );
}
