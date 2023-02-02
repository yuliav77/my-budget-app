import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = (props) => {
    const { dispatch,budget,expenses,currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const updateBudget = (newBudget) => {
        if (newBudget >= totalExpenses) {
            if (newBudget<=20000) {
                dispatch({
                    type: 'SET_BUDGET',
                    payload: newBudget,
                })  
            } else {
                alert('Can\'t set budget more than maximum '+currency+'20000');
            }
        } else {
            alert('Can\'t set budget less than amount spent so far '+currency+totalExpenses);
        }
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency} <input
                        required='required'
                        type='number'
                        max='20000'
                        min={expenses}
                        step='10'
                        value={budget}
                        style={{ width: '5rem' , size:6}}
                        onChange={(event) => updateBudget(event.target.value)}>
                 </input>
            </span>
        </div>
    );
};

export default Budget;
