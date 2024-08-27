import React, { useState , useEffect} from 'react'
import CenterColDiv from './centerDiv';
import QuestionUI from './questionUI';
import ShowResult from './result';
import ProgressBar from './progress';

const QuizUI = ({closeFunction, questionArray}) => {
    console.log(questionArray);
    const [timeTaken, setTimeTaken] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [questionIndex,setQuestionIndex] = useState(0);
    const [chosenAnswers, setChosenAnswers] = useState(
        Array.from({ length: questionArray.length }, () => '')
    );
    
    useEffect(() => {
        let timer;
        if (!showResult) {
            timer = setInterval(() => {
                setTimeTaken(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [showResult]);


    const handleQuestionUpdate = () => {
        setQuestionIndex((prev) => {
            if(prev !== questionArray.length -1){
                return prev + 1;
            }
        });
    };

    const handleAnswerUpdate = (questionIndex, answer) => {
        setChosenAnswers((prev) => {
            let updatedAnswer = [...prev];
            updatedAnswer[questionIndex] = answer;
            return updatedAnswer;
        });
    };

    if (showResult) {
        return <ShowResult questionArray={questionArray} chosenAnswers={chosenAnswers} closeFunction={closeFunction} time={timeTaken}/>
    } else {
        return (
            <div className='h-screen w-screen fixed top-0 left-0 overflow-x-hidden overflow-y-auto bg-slate-100 text-black'>
                <CenterColDiv> 
                        <ProgressBar
                            setQuestionIndex={setQuestionIndex} 
                            value={questionIndex+1} 
                            max={questionArray.length} 
                            chosenAnswers={chosenAnswers}
                        />
                        <QuestionUI
                            questionIndex={questionIndex} 
                            quizQuestion={questionArray[questionIndex]}
                            handleAnswerUpdate={handleAnswerUpdate}
                            chosenAnswers={chosenAnswers}
                            showResult={showResult}
                        />
                        <div className='flex items-center justify-around w-full'>
                            <button className='btn btn-wide btn-xs sm:btn-sm md:btn-md btn-error' onClick={closeFunction}>
                                Close
                            </button> 
                            <button className='btn btn-wide btn-xs sm:btn-sm md:btn-md btn-secondary' onClick={()=>setShowResult(true)}>
                               Submit
                            </button>
                            <button
                                disabled={(questionIndex >= questionArray.length -1)} 
                                className='btn btn-wide btn-xs sm:btn-sm md:btn-md btn-accent' onClick={handleQuestionUpdate}>
                                Next
                            </button>
                        </div>
                </CenterColDiv>
            </div>
        )
    }

}

export default QuizUI;