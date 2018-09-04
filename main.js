import Loading from './src/components/Loading';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';

const LoadableApp = Loadable({
  loader: () => import('./src/App'),
  loading: Loading,
});

ReactDOM.render(LoadableApp, document.querySelector('#root'));
