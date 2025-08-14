import { useCallback, useState } from 'react';
import QuestionTimer from './QuestionTimer';
import { AWAIT_TIME, DEFAULT_TIME, REVEAL_TIME } from '../times';
import Answers from './Answers';
import { ANSWERED, CORRECT, WRONG } from '../answerStates';

const Question = ({ question, onSelectAnswer }) => {
	const [userAnswer, setUserAnswer] = useState({
		selectedAnswer: '',
		state: null,
	});

	const handleSelectAnswer = (answer) => {
		setUserAnswer({
			selectedAnswer: answer,
			state: answer ? ANSWERED : WRONG,
		});
	};

	const handleTimeOut = useCallback(() => {
		handleSelectAnswer(null);
	}, [handleSelectAnswer]);

	const handleRevealAnswer = () => {
		const isCorrect = question.answers[0] === userAnswer.selectedAnswer;
		setUserAnswer((a) => ({
			...a,
			state: isCorrect ? CORRECT : WRONG,
		}));
	};

	const handleSubmitAnswer = () => {
		onSelectAnswer(userAnswer.selectedAnswer);

		setUserAnswer({
			selectedAnswer: '',
			state: null,
		});
	};

	const timerProps = ((state) => {
		switch (state) {
			case null:
				return {
					key: 'timerAnswer',
					time: DEFAULT_TIME,
					onTimeOut: handleTimeOut,
				};
			case ANSWERED:
				return {
					key: 'timerWait',
					time: AWAIT_TIME,
					onTimeOut: handleRevealAnswer,
				};
			default:
				return {
					key: 'timerReveal',
					time: REVEAL_TIME,
					onTimeOut: handleSubmitAnswer,
				};
		}
	})(userAnswer.state);

	return (
		<div id="quiz">
			<div id="question">
				<QuestionTimer
					{...timerProps}
					key={timerProps.key}
					answered={userAnswer.state === ANSWERED}
				/>
				<h2>{question.text}</h2>
				<Answers
					answerState={userAnswer.state}
					chosenAnswer={userAnswer.selectedAnswer}
					answers={question.answers}
					correctAnswer={question.answers[0]}
					onSelectAnswer={handleSelectAnswer}
				/>
			</div>
		</div>
	);
};

export default Question;
