import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter, Route } from 'react-router-dom';
import PowerLines from './components/powerLines/powerLines';
import { Container } from 'reactstrap';
import Contents from './components/contents/contents';
import Header from './components/header/header';
import EnergyLosses from './components/energyLosses/energyLosses';
import ElectricDrive from './components/electricDrive/electricDrive';
import ElectroInstallations from './components/electroInstallations/electroInstallations';
import LightingEnergy from './components/lightingEnergy/lightingEnergy';
import HouseElectro from './components/houseElectro/houseElectro';
import Tasks from './components/tasks/tasks';

function App() {
  return (
    <Container className="p-0" fluid>
      <HashRouter>
        <Header />
        <Route exact path="/" component={Contents} />
        <Route path="/powerLines" component={PowerLines} />
        <Route path="/energyLosses" component={EnergyLosses} />
        <Route path="/electricDrive" component={ElectricDrive} />
        <Route path="/electroInstallations" component={ElectroInstallations} />
        <Route path="/lightingEnergy" component={LightingEnergy} />
        <Route path="/houseElectro" component={HouseElectro} />
        <Route path="/tasks" component={Tasks} />
      </HashRouter>
    </Container>
  );
}

export default App;
