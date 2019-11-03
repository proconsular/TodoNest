import React from 'react';
import './App.css';
import { ProviderWrapper } from './components/ProviderWrapper';
import { getStore } from './redux/store';

import Entry from './pages/Entry'

const App = () => {
	return (
		<ProviderWrapper store={getStore()}>
			<Entry />
		</ProviderWrapper>
	)
}

export default App;
