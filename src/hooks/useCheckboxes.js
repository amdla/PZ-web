import { useState } from "react";


function useCheckboxes(data, keyProperty = 'id'){
    const initialState = {'selectAll': false};
    data.forEach(item => {
        initialState[item[keyProperty]] = false;
    });

    const [checkBoxes, setCheckBoxes] = useState(initialState);

    const toggleCheckbox = (key) =>{
        if(key === 'selectAll'){
            const newValue = !checkBoxes.selectAll;
            const newState = {'selectAll' : newValue};
            data.forEach((item) => {
                newState[item[keyProperty]] = newValue;
            });
            setCheckBoxes(newState);
        } else{
            setCheckBoxes((prev) => {
                const newState = {...prev, [key] : !prev[key]};
                return newState;
            });
        }
    };
    return [checkBoxes, toggleCheckbox, setCheckBoxes];
}

export default useCheckboxes;
