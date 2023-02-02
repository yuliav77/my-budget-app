import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Budget from './components/Budget';
import AllocationForm from './components/AllocationForm';
import ExpenseList from './components/ExpenseList';
import ExpenseTotal from './components/ExpenseTotal';
import Remaining from './components/Remaining';
import Currencies from './components/Currencies';
import { AppProvider } from './context/AppContext';

const App = () => {
    return (
        <AppProvider>
            <div className='container'>
                {/* Add the code here to add the components          */}
                <h2 className='mt-3'>Budget calculator</h2>
                <div class='row mt-3'>
                    <div class='col-sm'><Budget /></div>
                    <div class='col-sm'><Remaining /></div>
                    <div class='col-sm'><ExpenseTotal /></div>
                    <div class='col-sm'><Currencies /></div>
                </div>
                <h3 className='mt-3'>Allocation</h3>
                <div class='row mt-3'>
                    <div class='column'><ExpenseList /></div>
                </div>
                <h3 className='mt-3'>Change allocation</h3>
                <div class='row mt-3'>
                    <div class='column'><AllocationForm /></div>
                </div>
            </div>
        </AppProvider>
    );
};
export default App;
