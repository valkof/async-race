import { App } from './App';
import './style.scss';

App.getInitSettings()
  .then(initSettings => {
    new App(document.body, initSettings).render();
  });
