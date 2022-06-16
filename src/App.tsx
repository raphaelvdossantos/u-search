import { Wrapper } from "./App.styled";
import Dashboard from "./components/dashboard/dashboard";
import NavBar from "./components/navbar/navbar";
import DataProvider from "./context/DataContext";

function App() {

  return (
    <DataProvider>
      <Wrapper>
        <NavBar />
        <Dashboard />
      </Wrapper>
    </DataProvider>
  );
}

export default App;
