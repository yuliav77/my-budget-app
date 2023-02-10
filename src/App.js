import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Budget from './components/Budget';
import AllocationForm from './components/AllocationForm';
import ExpenseList from './components/ExpenseList';
import ExpenseTotal from './components/ExpenseTotal';
import Remaining from './components/Remaining';
import Currencies from './components/Currencies';
import NewAllocation from './components/NewAllocation';
import { AppProvider } from './context/AppContext';

const App = () => {
    return (
        <AppProvider>
            <div className='container'>
                {/* Add the code here to add the components          */}
                <h2 className='mt-3'>Budget calculator</h2>
                <div className='row mt-3 position-sticky fixed-top pt-2 bg-white shadow-sm'>
                    <div className='col-sm'><Budget /></div>
                    <div className='col-sm'><Remaining /></div>
                    <div className='col-sm'><ExpenseTotal /></div>
                    <div className='col-sm'><Currencies /></div>
                </div>
                <h3 className='mt-3'>Allocation</h3>
                <div className='row mt-3'>
                    <div className='column'><ExpenseList /></div>
                </div>
                <h3 className='mt-3'>Add new category</h3>
                <div className="column"><NewAllocation /></div>
                <h3 className='mt-3'>Change allocation</h3>
                <div className='row mt-3'>
                    <div className='column'><AllocationForm /></div>
                </div>
            </div>
        </AppProvider>
    );
};
export default App;
