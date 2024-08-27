import OptionsUI from "./optionsUI";

const getExplanationColor = (quizQuestion, chosenAnswer) => {
    if(chosenAnswer){
        if(chosenAnswer===quizQuestion.answer){
            return 'bg-success';
        } else {
            return 'bg-error';
        }
    } 
    return "bg-yellow-300";
}

const QuestionUI = ({questionIndex,quizQuestion,chosenAnswers,handleAnswerUpdate, showResult}) => {
    return (
      <div className={`h-full w-full ${showResult?"pointer-events-none":""}`}>
          <h1 className='text-2xl md:text-3xl font-bold my-6'>{questionIndex+1}) {quizQuestion.question}</h1>
          <div className='flex flex-col gap-8'>
            {
                quizQuestion.option.map((option, index) => (
                  <OptionsUI 
                    key={index}
                    optionText={option}
                    questionIndex={questionIndex}
                    handleAnswerUpdate={handleAnswerUpdate}
                    chosenAnswer={chosenAnswers[questionIndex]}
                    showResult={showResult}
                    correctAnswer={quizQuestion.answer}
                  />
                ))
  
            }
          </div>
          {
            showResult &&
            <div className={`p-4 my-4 ${getExplanationColor(quizQuestion, chosenAnswers[questionIndex])} 
                text-base-100 rounded-lg`
            }>
                <p className="font-semibold text-lg">
                    <span className="font-bold text-xl">Explanation: </span>
                    {quizQuestion.explanation}
                </p>
            </div>
          }
      </div>
    )
}

export default QuestionUI;