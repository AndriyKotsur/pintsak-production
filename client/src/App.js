import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store'
import Main from './pages'
import './style.css'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
