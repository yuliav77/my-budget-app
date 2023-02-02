import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = (props) => {
    const { dispatch,remaining,currency  } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const handleSetCost = (cost) => {
        if(!/^[0-9]+$/.test(cost)){
            alert("Please only enter numeric characters only");
            return;
          }
        if(cost > remaining) {
            alert("The value cannot exceed remaining funds  "+currency+remaining);
            return;
        } 
        setCost(cost);
    }

    const submitEvent = () => {

            if(cost > remaining) {
                alert("The value cannot exceed remaining funds  "+currency+remaining);
                setCost("");
                return;
            }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };
        if(action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
                dispatch({
                    type: 'ADD_EXPENSE',
                    payload: expense,
                });
            }
    };

    return (
        <div>
            <div className='row'>

            <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                </div>
                  <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Accomodation" name="accomodation">Accomodation</option>
                        <option value="Food" name="food">Food</option>
                        <option value="Clothes" name="clothes">Clothes</option>
                        <option value="Facilities" name="facilities">Facilities</option>
                        <option value="Accessoires" name="accessoires">Accessoires</option>
                  </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                </div>
                  <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                         <option value="Reduce" name="Reduce">Reduce</option>
                  </select>
                    <span style={{marginLeft: '2rem', marginRight: '0.2rem', display:'flex', alignItems:'center'}}>{currency}</span>
                    <input
                        required='required'
                        type='number'
                        id='cost'
                        value={cost}
                        style={{size: 10}}
                        onChange={(event) => handleSetCost(event.target.value)}>
                        </input>
                    
                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
                </div>

        </div>
    );
};

export default AllocationForm;
