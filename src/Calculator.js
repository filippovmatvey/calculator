import { useState } from "react";
import { AutoTextSize } from 'auto-text-size';

export function Calculator() {
    const [value, setValue] = useState(0);
    const [mathAction, setMathAction] = useState(null); 
    const [prevValue, setPrevValue] = useState(null);
    
    const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, '.', '='];
    const actions = ['C', '÷', 'x', '-', '+'];

    const handleClickNumber = (number) => {
        if (number === '=') {
            if (mathAction && prevValue) {
                setValue(eval(prevValue + mathAction + value));
            }

            return false;
        }

        if (mathAction && !prevValue) {
            setPrevValue(value);
            setValue(0);
        }

        setValue((prev) => {
            const prevStr = String(prev);

            let result = prevStr + number;

            if (prevStr.includes('.') && number === '.') {
                result = prevStr;
            } else if (prevStr === '0' && number !== '.') {
                result = number;
            }

            return result;
        })
    }

    const handleClickAction = (action) => {
        if (action === 'C') {
            setMathAction(null);

            setPrevValue(null);

            return setValue(0);
        }

        if (mathAction && prevValue) {
            setValue(eval(prevValue + mathAction + value));
            setPrevValue(null);
        }

        const correctMath = action === 'x' ? '*' : (action === '÷' ? '/' : action)

        setMathAction(correctMath);
    }

    return (
        <div className="calc-wrapper">
            <div className="calc-screen">
                <div className="calc-screen-inner"><AutoTextSize>{value}</AutoTextSize></div>
            </div>
            <div className="calc-buttons">
                <div className="calc-numbers">
                    {numbers.map((number) => {
                        return <button value={number} onClick={(e) => handleClickNumber(String(e.target.value))} key={number}>{number}</button>
                    })}
                </div>
                <div className="calc-actions">
                    {actions.map((action) => {
                        return <button value={action} onClick={(e) => handleClickAction(e.target.value)} key={action}>{action}</button>
                    })}
                </div>
            </div>
        </div>
    )
}
