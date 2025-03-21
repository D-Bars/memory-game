import { FC } from 'react';
import cl from './InputLabel.module.scss';

interface InputLabelProps {
    id: string;
    inputType: string;
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const InputLabel: FC<InputLabelProps> = ({ id, inputType, label, value, onChange, placeholder }) => {
    return (
        <div className={cl.label_input_box}>
            <input
                id={id}
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {label && <label htmlFor={id}>{label}</label>}
        </div>
    );
};
export default InputLabel;