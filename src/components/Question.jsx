import { useCallback } from 'react';
import QuestionTimer from './QuestionTimer';
import { DEFAULT_TIME } from '../times';
import Answers from './Answers';

const Question = ({
	question,
	questionIdx,
	onSelectAnswer,
	answerState,
	chosenAnswer,
}) => {
	const handleTimeOut = useCallback(() => {
		onSelectAnswer(null);
	}, [onSelectAnswer]);

	return (
		<div id="quiz">
			<div id="question">
				<QuestionTimer
					key={`timer-${questionIdx}`}
					time={DEFAULT_TIME}
					onTimeOut={handleTimeOut}
				/>
				<h2>{question.text}</h2>
				<Answers
					key={`answers-${questionIdx}`}
					answerState={answerState}
					answers={question.answers}
					chosenAnswer={chosenAnswer}
					correctAnswer={question.answers[0]}
					onSelectAnswer={onSelectAnswer}
				/>
			</div>
		</div>
	);
};

export default Question;
