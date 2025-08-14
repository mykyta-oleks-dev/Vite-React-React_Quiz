import { useCallback, useState } from 'react';
import QuestionTimer from './QuestionTimer';
import { AWAIT_TIME, DEFAULT_TIME, REVEAL_TIME } from '../times';
import Answers from './Answers';
import { ANSWERED, AWAIT, CORRECT, WRONG } from '../answerStates';

const Question = ({ question, onSelectAnswer }) => {
	const [userAnswer, setUserAnswer] = useState({
		selectedAnswer: '',
		state: null,
	});

	const handleSelectAnswer = (answer) => {
		setUserAnswer({
			selectedAnswer: answer,
			state: ANSWERED,
		});

		const setRevealTimeout = () => {
			const isCorrect = question.answers[0] === answer;
			setUserAnswer((a) => ({
				...a,
				state: isCorrect ? CORRECT : WRONG,
			}));

			setTimeout(() => {
				onSelectAnswer(answer);
				setUserAnswer({
					selectedAnswer: '',
					state: null,
				});
			}, REVEAL_TIME);
		};

		if (answer)
			setTimeout(() => {
				setUserAnswer((a) => ({ ...a, state: AWAIT }));
				setRevealTimeout();
			}, AWAIT_TIME);
		else {
			setRevealTimeout();
		}
	};

	const handleTimeOut = useCallback(() => {
		handleSelectAnswer(null);
	}, [handleSelectAnswer]);

	return (
		<div id="quiz">
			<div id="question">
				<QuestionTimer time={DEFAULT_TIME} onTimeOut={handleTimeOut} />
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
