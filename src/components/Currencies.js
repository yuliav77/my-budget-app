import React, { useContext, useState } from 'react';
import Select, { components } from 'react-select';
import { AppContext } from '../context/AppContext';

const Currencies = (props) => {
    const currencies = [
        {value: '$', label: '$ Dollar'},
        {value: '£', label: '£ Pound'},
        {value: '€', label: '€ Euro'},
        {value: '₹', label: '₹ Rupee'},
    ];
    const {dispatch} = useContext(AppContext);
    const [selectedOption, setSelected] = useState(currencies[1]);

    const customStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: "#000000",
            backgroundColor: state.isSelected ? "#fff" : "#94e59a",
          }),
      
          control: (defaultStyles) => ({
            ...defaultStyles,
            color: "#ffffff",
            backgroundColor: "#94e59a",
            padding: "10px",
            border: "none",
            boxShadow: "none",
          }),
          singleValue: (defaultStyles) => ({ 
            ...defaultStyles, 
            color: "#ffffff", 
            backgroundColor: "#94e59a",
        }),
        dropdownIndicator: (defaultStyles) => ({
            ...defaultStyles, 
            color: "#ffffff", 
        }),
        
    };

    const handleChangeOption = (selectedOption) => {
        setSelected(selectedOption);
        dispatch({
            type: 'CHG_CURRENCY',
            payload: selectedOption.value,
        })
    }
    return (
        <Select 
            options={currencies} 
            defaultValue={currencies[1]} 
            value={selectedOption} 
            styles={customStyles} 
            isSearchable={false} 
            onChange={handleChangeOption}
            components={{
                SingleValue: ({ children, ...props }) => {
                  return (
                    <components.SingleValue {...props}>
                      {"Currency (" + children + ")"}
                    </components.SingleValue>
                  );
                },
              }}
        />
    )
}

export default Currencies;
