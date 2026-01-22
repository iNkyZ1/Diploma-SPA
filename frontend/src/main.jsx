import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './shared/styles/theme.css';
import './shared/styles/base.css';
import './shared/styles/utilities.css';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './app/store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);
