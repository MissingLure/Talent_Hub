import React, { useState } from 'react';
import './PreguntaContainer.css';

const PreguntaContainer = ({ title, questions }) => {
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill('None'));
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const handleOptionClick = (option, index, value) => {
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
            <div>
              {questions.map((question, index) => (
                <div className="question" key={index}>
                  <p>{question}</p>
                  <div className="options-container">
                    <div
                      className={`dropdown-container ${openDropdownIndex === index ? 'show' : ''}`}
                    >
                      <button onClick={() => toggleDropdown(index)} className={`dropbtn ${selectedOptions[index]}`}>
                        {selectedOptions[index] || 'None'}
                      </button>
                      <div
                        id={`myDropdown-${index}`}
                        className={`dropdown-content ${openDropdownIndex === index ? 'show' : ''} ${selectedOptions[index]}`}
                      >
                        <div
                          className="dropdown-option"
                          onClick={() => handleOptionClick('Low', index, 0)}
                        >
                          Low
                        </div>
                        <div
                          className="dropdown-option"
                          onClick={() => handleOptionClick('Moderate', index, 1)}
                        >
                          Moderate
                        </div>
                        <div
                          className="dropdown-option"
                          onClick={() => handleOptionClick('Outstanding', index, 2)}
                        >
                          Outstanding
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay datos.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreguntaContainer;
