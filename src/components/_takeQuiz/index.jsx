import React, { useState } from 'react';

const CenterDiv = ({children}) => {
    return (
        <div className='center_div flex flex-col gap-16 items-center justify-center h-full w-full p-4 md:p-20'>
            {children}
        </div>
    );
}

const ProgressIndicator = ({value, max}) => {
    return (
        <div className='flex items-center justify-center gap-2 flex-wrap md:flex-nowrap w-full h-10'>
            <progress className="progress progress-info w-full h-4" value={value} max={max}></progress>
            <p className='font-semibold'>{value}/{max}</p>
        </div>
        
    );
}


const CloseButton = ({closeFunction, children}) => {
    return (
        <div className='p-2'>
                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-error" onClick={closeFunction}>{children}</button>
        </div>
    );
}


const NextAndContinueButton = ({nextFunction, checkFunction}) => {
    const [checkBool, setCheckBool] = useState(true);
    const handleButtonClick = () => {
        if (checkBool) {
            checkFunction();
            setCheckBool(false);
        } else {
            nextFunction();
            setCheckBool(true);
        }
    }
    return (
        <div className='p-2'>
                    <button 
                        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary" 
                        onClick={handleButtonClick}
                    >
                        {checkBool ? "Check Answer" : "Next Question"}
                    </button>
        </div>
    );
}

const QuestionUI = ({questionIndex,question, answer, explanation, options,checkAnswer, chosenAnswer, setChosenAnswer}) => {
    
    const handleAnswerChange = (value) => {
        setChosenAnswer(value);
    }
    return (
        <div className='h-full w-full flex flex-col gap-8 items-start justify-start'>
            <h3 className=' text-2xl md:text-3xl text-left font-bold'>{`Q ${questionIndex+1}) ${question}`}</h3>
            {
                options.map((option, index) => (
                    <OptionsUI 
                        key={index}
                        optionText={option} 
                        choiceSetter={handleAnswerChange} 
                        chosen={chosenAnswer}
                        correctAnswer={answer} 
                        checkAnswer={checkAnswer} 
                        index={questionIndex}
                    />
                ))
            }
        </div>
        
    )
}


const OptionsUI = ({optionText, index, choiceSetter,chosen, correctAnswer,checkAnswer}) => {
    const handleOnChange = () => {
        choiceSetter((prev)=> {
            let updatedAnswer = [...prev];
            updatedAnswer[index] = optionText;
            return updatedAnswer;
        });
    };
    const optionColorIndicator =
  chosen[index] === optionText
    ? (!checkAnswer ? 'bg-primary' : ((chosen[index] === correctAnswer) ? 'bg-green-300' : 'bg-red-300'))
    : (checkAnswer && correctAnswer===optionText)?'bg-green-300':'bg-slate-200 hover:bg-gray-200 hover:shadow-xl';

    const optionRadioIndicator =chosen[index] === optionText
    ? (!checkAnswer ? 'radio radio-primary' : (chosen[index] === correctAnswer ? 'radio radio-success' : 'radio radio-error'))
    : (checkAnswer && correctAnswer===optionText)?'radio radio-success':'radio radio-primary';
    
     return (
        <div className={`${optionColorIndicator} rounded-lg gap-4 w-full px-4 py-2 text-black`}>
            <div className="form-control">
                <label className="label items-center justify-start gap-6 cursor-pointer">
                    <input
                        disabled={checkAnswer} 
                        type="radio" 
                        onChange={handleOnChange} 
                        name="radio-10" 
                        className={optionRadioIndicator} 
                        value={chosen[index] === optionText} 
                    />
                    <span className="text-left">{optionText}</span>
                </label>
            </div>
        </div>
    );
}

const TakeQuiz_ = ({closeFunction, questionArray}) => {
    const [chosenAnswer, setChosenAnswer] = useState(
        Array.from({ length: questionArray.length }, () => '')
    );
    const [questionIndex,setQuestionIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [checkAnswer, setCheckAnswer] = useState(false);

    const questionAnswerValidator = () => {
        let score = 0;
        for (let i = 0; i < questionArray.length; i++) {
            if(questionArray[i].answer === chosenAnswer[i]){
                score++;
            }
        };
        return score;
    }
    const handleQuestionChange = () => {
        if (questionIndex < questionArray.length - 1) {
            setQuestionIndex(questionIndex + 1);
            setCheckAnswer(false);
        } else {
            setShowResult(true);
        }
    }
    const handleAnswerCheck = () => setCheckAnswer(true);

    if ( showResult ) return <ShowResult score={questionAnswerValidator()} />

    console.log(checkAnswer);
  return (
    <div className='h-screen w-screen fixed top-0 left-0 overflow-x-hidden overflow-y-auto bg-slate-100 text-black'>
        <CenterDiv>
            <ProgressIndicator value={questionIndex+1} max={questionArray.length}></ProgressIndicator>
            <QuestionUI
                questionIndex={questionIndex} 
                question={questionArray[questionIndex].question} 
                answer={questionArray[questionIndex].answer} 
                checkAnswer={checkAnswer}
                explanation={questionArray[questionIndex].explanation} 
                options={questionArray[questionIndex].option} 
                closeFunction={closeFunction} 
                chosenAnswer={chosenAnswer}
                setChosenAnswer={setChosenAnswer}
            />
            <div className='flex items-center justify-around w-full'>
                <CloseButton onClick={closeFunction}>Close</CloseButton> 
                <NextAndContinueButton 
                    nextFunction={handleQuestionChange}
                    checkFunction={handleAnswerCheck}
                />
            </div>
        </CenterDiv>
    </div>
                
  );
}

const ShowResult = ({score}) => {
    console.log(score);
    return (
        <div className='h-screen w-screen fixed top-0 left-0 overflow-x-hidden overflow-y-auto bg-slate-100 text-black'>
            <CenterDiv>
                <h1 className='text-2xl md:text-3xl font-bold'>Result</h1>
            </CenterDiv>
        </div>
    );
};

export default TakeQuiz_