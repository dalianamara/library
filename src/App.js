import LibraryBanner from "./components/LibraryBanner";
import "./App.css";
import Menu from "./components/Menu";

function App() {
  return (
    <div className="app-settings">
      <LibraryBanner />
      <Menu />
      <div id="portalContainer"></div>
    </div>
  );
}
export default App;
