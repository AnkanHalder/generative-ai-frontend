import React from 'react'
import QuizSetter from './view/quizUI'

const TakeQuiz = ({closeFunction, questionArray}) => {
  return (
        <QuizSetter closeFunction={closeFunction} questionArray={questionArray}/>
  )
}

export default TakeQuiz