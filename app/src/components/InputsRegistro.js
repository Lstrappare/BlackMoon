import React from 'react';

export const InputsRegistro = ({ label, type, name, placeholder, value, onChange, clase }) => {
  return (
    <div className="my-2">
      <label>
        <p className="text-center md:text-start">{label}</p> 
        <input 
          type={type} 
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-orange-200 rounded-lg text-center ${clase}`}
        />
      </label>
    </div>
  );
};
