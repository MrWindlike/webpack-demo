import ClassComponent from 'Components/ClassComponent';
import FunctionalComponent from 'Components/FunctionalComponent';
import './App.scss';

const App = () => (
  <div className="container">
    <ClassComponent title="I'm title." />
    <FunctionalComponent />
  </div>
);

export default App;
