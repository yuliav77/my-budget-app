import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const NewAllocation = () => {
    const { dispatch,currency,expenses } = useContext(AppContext);
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const addAllocation = () => {
        if (name) {
            const dublicateCategory = expenses.filter((expense) => expense.id === name);
            if (!dublicateCategory.length) {
                dispatch({
                    type: 'ADD_ALLOCATION',
                    name: name,
                    cost: parseInt(cost),
                });    
                setCost(0);
                setName('');  
            } else {
                alert('This category is already existing!');
            }
        } else {
            alert('Please, enter New Allocation name');
        }
    };

    const handleSetCost = (enteredValue) => {
        if(!/^[0-9]+$/.test(enteredValue)) {
            alert("Please only enter numeric characters only");
            return;
        } else {
            setCost(enteredValue);
        }
    };

    return (
        <div>
            <span>
                Name:<input type='text' value={name} style={{marginLeft:'0.3em'}} onChange={(e) => setName(e.target.value)}></input>
            </span>
            <span style={{marginLeft:'10px'}}>
                Budget for it: {currency}<input 
                                            required='required'
                                            type='number'
                                            id='cost'
                                            value={cost} 
                                            style={{marginLeft:'0.1em'}}
                                            onChange={(e) => handleSetCost(e.target.value)}>
                                        </input>
            </span>
            <button className="btn btn-primary" style={{ marginLeft: '2rem' }} onClick={addAllocation}>Add new category</button>
        </div>
    );
};

export default NewAllocation;
