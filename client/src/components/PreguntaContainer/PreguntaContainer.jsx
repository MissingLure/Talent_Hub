import React, { useState, useEffect } from 'react';
import './PreguntaContainer.css';

const PreguntaContainer = ({ title, questions, onTotalChange }) => {
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill('None'));
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  useEffect(() => {
    if (onTotalChange) {
      onTotalChange(calculateTotal());
    }
  }, [selectedOptions, onTotalChange]);

  const handleOptionClick = (option, index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = option;
    setSelectedOptions(newSelectedOptions);
    setOpenDropdownIndex(null);
  };

  const calculateTotal = () => {
    return selectedOptions.reduce((total, value) => {
      return total + (value === 'Moderate' ? 1 : value === 'Outstanding' ? 2 : 0);
    }, 0);
  };

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <div className="main-container">
      <div className="title-container">
        <div className='title-data-container'>
          <h3>{title}</h3>
        </div>
        <div>
          <h5 className='calification-container'>{calculateTotal()}</h5>
        </div>
      </div>
      <div className="content-container">
        <div className="questions">
          {questions && questions.length > 0 ? (
            questions.map((question, index) => (
              <div className="question" key={index}>
                <p>{question}</p>
                <div className="options-container">
                  <div className={`dropdown-container ${openDropdownIndex === index ? 'show' : ''}`}>
                    <button onClick={() => toggleDropdown(index)} className={`dropbtn ${selectedOptions[index]}`}>
                      {selectedOptions[index] || 'None'}
                    </button>
                    <div className={`dropdown-content ${openDropdownIndex === index ? 'show' : ''}`}>
                      <div className="dropdown-option" onClick={() => handleOptionClick('Low', index)}>
                        Low
                      </div>
                      <div className="dropdown-option" onClick={() => handleOptionClick('Moderate', index)}>
                        Moderate
                      </div>
                      <div className="dropdown-option" onClick={() => handleOptionClick('Outstanding', index)}>
                        Outstanding
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No hay datos.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreguntaContainer;
