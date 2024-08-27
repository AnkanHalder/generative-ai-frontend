import React from 'react';

const getOptionDesign = (optionText, chosenAnswer, correctAnswer, showResult) => {
    if(showResult && optionText === correctAnswer){
        return { blockDesign: 'bg-success', radioDesign: 'radio radio-success' };
    } else if (chosenAnswer === optionText) {
        if (showResult) {
            return optionText === correctAnswer
                ? { blockDesign: 'bg-success', radioDesign: 'radio radio-success' }
                : { blockDesign: 'bg-error', radioDesign: 'radio radio-error' };
        }
        return { blockDesign: 'bg-primary', radioDesign: 'radio radio-primary' };
    }
    return { blockDesign: 'bg-transparent hover:bg-gray-300 hover:shadow-xl', radioDesign: 'radio radio-primary radio-md' };
};

const OptionsUI = ({ optionText, questionIndex, handleAnswerUpdate, chosenAnswer, correctAnswer, showResult }) => {
    const design = getOptionDesign(optionText, chosenAnswer, correctAnswer, showResult);
    console.log('chosenAnswer', chosenAnswer , 'correctAnswer', correctAnswer);
    return (
        <div className={`${design.blockDesign} px-4 py-2 rounded-lg text-semibold text-lg`}>
            <div className="form-control">
                <label className="label items-center justify-start gap-6 cursor-pointer">
                    <input
                        disabled={false}
                        type="radio"
                        onChange={() => handleAnswerUpdate(questionIndex, optionText)}
                        name={`radio-${questionIndex}`}
                        className={design.radioDesign}
                        checked={chosenAnswer === optionText}
                    />
                    <span className="text-left">{optionText}</span>
                </label>
            </div>
        </div>
    );
};

export default OptionsUI;
