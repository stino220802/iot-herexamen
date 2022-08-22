import React from 'react'
import './App.css';
import { FilteringTable } from './components/filteringTable'

 

class App extends React.Component {


    render() {
        return (
            <div className="App">
                <FilteringTable />
            </div>
        )

    }

}

export default App;