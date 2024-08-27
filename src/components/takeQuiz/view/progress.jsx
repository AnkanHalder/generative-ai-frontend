import React from 'react';

const handleButtonColor = (value,index,chosenAnswer) => {
  if(value===index) return "btn-primary"
  else if (chosenAnswer) return "btn-accent opacity-70"
  else return "btn-primary opacity-50"
};


const ProgressBar = ({ value, max, setQuestionIndex, chosenAnswers }) => {
  const buttons = Array.from({ length: max }, (_, index) => (
    <button
      onClick = {()=>setQuestionIndex(index)}
      key={index}
      className={`btn btn-circle ${handleButtonColor(value,index+1,chosenAnswers[index])}`}
    >
      {index + 1}
    </button>
  ));

  return (
    <div className="w-full h-6 md:h-8 p-2 flex items-center justify-between gap-4">
      <div className='flex flex-wrap items-center justify-start gap-2'>
        {buttons}
      </div>
      {/* <progress className="progress progress-primary w-full h-full" value={value} max={max}></progress>
      <p>{value}/{max}</p> */}
    </div>
  );
};

export default ProgressBar;
