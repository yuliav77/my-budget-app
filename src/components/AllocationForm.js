import React, { useContext, useState } from 'react';
import Select from 'react-select';
import { AppContext } from '../context/AppContext';

const AllocationForm = (props) => {
    const { dispatch,remaining,currency,expenses  } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const expencesNames = expenses.map((expence)=>{
        return {value: expence.id, label: expence.name};
    })

    const expencesActions = [
        {value:"Add", label:"Add"},
        {value:"Reduce", label:"Reduce"},
    ];

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

    const handleSelectCategory = (selectedOption) => {
        setName(selectedOption.value);
    };

    const handleSelectAction = (selectedOption) => {
        setAction(selectedOption.value);
    };

    return (
        <div>
            <div className='row'>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Category</label>
                    </div>
                    <Select 
                        className="custom-select"
                        id="inputGroupSelect01"
                        options={expencesNames} 
                        placeholder={'Choose..'}
                        menuPlacement='top'
                        onChange={handleSelectCategory}
                    />
                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                    </div>
                    <Select
                        options={expencesActions}
                        defaultValue={expencesActions[0]}
                        menuPlacement='top'
                        onChange={handleSelectAction}
                    />
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
