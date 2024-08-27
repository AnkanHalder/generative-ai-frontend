import QuestionUI from "./questionUI";

const getQuizResults = (questionArray,chosenAnswers,marksPerCorrectAnswer=1, negativeMarksPerIncorrectAnswer=0) => {
    let score = 0;
    let unattemptedAnswers = 0;
    let wrongAnswers = 0;
    let correctAnswers = 0;
    for(let i = 0; i < questionArray.length; i++) {
        if(questionArray[i].answer === chosenAnswers[i]) {
            score += marksPerCorrectAnswer;
            correctAnswers += 1;
        } else if(!chosenAnswers[i]){
            unattemptedAnswers += 1;
        } else {
            score -= negativeMarksPerIncorrectAnswer;
            wrongAnswers += 1;
        }
    }
    return {
        totalQuestions: questionArray.length,
        totalUnattemptedQuestions: unattemptedAnswers,
        totalCorrectAnswers: correctAnswers,
        totalWrongAnswers: wrongAnswers,
        totalScore: score,
        totalNegativeMarks: wrongAnswers * negativeMarksPerIncorrectAnswer,
        totalPositiveMarks: correctAnswers * marksPerCorrectAnswer,
        totalMarksPossible: questionArray.length * marksPerCorrectAnswer,
        percentage: score/(questionArray.length * marksPerCorrectAnswer)*100,
    }
}

const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
};



const HeroHeading = ({heading,text}) => {
    return  (
        <div className="hero min-h-[40vh] bg-primary text-primary-content rounded-lg">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">{heading}</h1>
                        <p className="py-6">
                            {text}
                        </p>
                    </div>
                </div>
        </div>
    );
}

const AccuracyRadialProgress = ({value,size="8rem",thickness="0.8rem",colorScheme = 'text-primary', className=''}) =>{
    return (
        <div 
            className={`radial-progress ${colorScheme} ${className}`} 
            style={{ "--value": value , "--size": size, "--thickness": thickness }} 
            role="progressbar"
        >
            {value}%
        </div>
    );
};


const ScoreCard = ({scoreDetails}) =>{
    return (
        <div className="card bg-base-100 shadow-xl text-white m-2">
              <div className="card-body flex lg:flex-row">
                <div className="lg:w-1/3 flex items-center justify-center">
                    <AccuracyRadialProgress value={scoreDetails.percentage} colorScheme={"text-accent"}  />
                </div>
                <div className="lg:w-2/3">
                    <div className="p-4 ">
                        <h2 className="card-title text-accent text-3xl py-2">Total Score: {scoreDetails.totalScore}</h2>
                        <div className="w-full max-w-md text-left text-gray-500">
                            <p>Total Questions: <span className="font-bold text-primary">{scoreDetails.totalQuestions}</span></p>
                            <p>Total Marks: <span className="font-bold text-primary">{scoreDetails.totalScore} / {scoreDetails.totalMarksPossible}</span></p>
                            <p>Correct Answers: <span className="text-success font-bold">{scoreDetails.totalCorrectAnswers}</span></p>
                            <p>Wrong Answers: <span className="text-error font-bold">{scoreDetails.totalWrongAnswers}</span></p>
                            <p>Unattempted Questions: <span className="text-white font-bold">{scoreDetails.totalUnattemptedQuestions}</span></p>
                        </div>
                    </div>
                </div>
              </div>
        </div>
    )
}

const WrongAnswers = ({scoreDetails}) => {
    return (
        <div className="card bg-base-100 shadow-xl text-white m-2">
              <div className="card-body flex lg:flex-row">
                <div className="lg:w-1/3 flex items-center justify-center">
                    <AccuracyRadialProgress value={scoreDetails.totalWrongAnswers/scoreDetails.totalQuestions * 100} colorScheme={"text-error"} />
                </div>
                <div className="lg:w-2/3">
                    <div className="p-4 ">
                        <h2 className="card-title text-error text-3xl py-2">Wrong Answers: {scoreDetails.totalWrongAnswers}</h2>
                        <div className="w-full max-w-md text-left text-gray-500">
                            <p>Wrong Answers: <span className="text-error font-bold">{scoreDetails.totalWrongAnswers}</span></p>
                            <p className="my-2">Mistakes are stepping stones to success. Learn from them and come back stronger next time!</p>
                        </div>
                    </div>
                </div>
              </div>
        </div>
    )
} 

const CorrectAnswers = ({scoreDetails}) => {
    return (
        <div className="card bg-base-100 shadow-xl text-white m-2">
              <div className="card-body flex lg:flex-row">
                <div className="lg:w-1/3 flex items-center justify-center">
                    <AccuracyRadialProgress 
                        value={scoreDetails.totalCorrectAnswers/scoreDetails.totalQuestions * 100} 
                        colorScheme={"text-success"} 
                    />
                </div>
                <div className="lg:w-2/3">
                    <div className="p-4 ">
                        <h2 className="card-title text-success text-3xl py-2">Correct Answers: {scoreDetails.totalCorrectAnswers}</h2>
                        <div className="w-full max-w-md text-left text-gray-500">
                            <p>Correct Answers: <span className="text-success font-bold">{scoreDetails.totalCorrectAnswers}</span></p>
                            <p className="my-2">Great job! Every correct answer brings you closer to mastery. Keep up the fantastic work!</p>
                        </div>
                    </div>
                </div>
              </div>
        </div>
    )
} 


const TimeTaken = ({time}) => {
    return (
        <div className="card bg-base-100 shadow-xl text-white m-2">
              <div className="card-body flex lg:flex-row">
                        <div className="w-full max-w-md text-left text-gray-500">
                            <p className="text-3xl">Time Taken</p>
                            <p className="text-5xl text-white my-2">{formatTime(time)}</p>
                            <p className="my-2">Every second counts! Your dedication and focus are key to improving. Stay sharp and keep challenging yourself!</p>
                        </div>
                </div>
        </div>

    )
} 

const ShowResult = ({questionArray,chosenAnswers,time,closeFunction}) => {
    const scoreDetails = getQuizResults(questionArray,chosenAnswers);
    console.log(scoreDetails);
    return (
        <div className="fixed top-0 left-0 h-screen w-screen overflow-x-hidden overflow-y-scroll bg-slate-100 text-black">
            <HeroHeading 
                heading="Check Your Test Reports"
                text="Review your performance in detail and track your progress over time."
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <ScoreCard scoreDetails={scoreDetails} />
                <WrongAnswers scoreDetails={scoreDetails} />
                <CorrectAnswers scoreDetails={scoreDetails} />
                <TimeTaken time={time} />
            </div>
            <div className="my-6">
                <HeroHeading 
                    heading="Answers And Explanations"
                    text="Understand every question with in-depth explanations to boost your learning."
                />
                <div className="flex flex-col gap-6 justify-center items-center w-full p-2 my-6">
                    {
                        questionArray.map((_,questionIndex) => {
                            return (
                                <div className="bg-base-100 text-accent shadow-inner w-full rounded-xl p-6 m-2" key={questionIndex}>
                                    <QuestionUI
                                        questionIndex={questionIndex} 
                                        quizQuestion={questionArray[questionIndex]}
                                        handleAnswerUpdate={()=>{}}
                                        chosenAnswers={chosenAnswers}
                                        showResult={true}
                                    />
                                </div>
                                
                            );
                        })
                    }
                </div>
                <div className="my-6 px-4">
                    <button className="btn btn-block btn-error text-white" onClick={closeFunction}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
};


export default ShowResult;