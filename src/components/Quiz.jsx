import { useCallback, useState } from 'react';
import questions from '../questions';
import Question from './Question';
import Results from './Results';
import { AWAIT_TIME, REVEAL_TIME } from '../times';
import { ANSWERED, AWAIT, CORRECT, WRONG } from '../answerStates';

const Quiz = () => {
	const [userAnswers, setUserAnswers] = useState([]);
	const [answerState, setAnswerState] = useState('');
	const [chosenAnswer, setChosenAnswer] = useState('');
	const activeQuestion = userAnswers.length;

	const question = questions[activeQuestion];

	const handleSelectAnswer = useCallback(
		(answer) => {
			setAnswerState(ANSWERED);
			setChosenAnswer(answer);

			const setRevealTimeout = () => {
				if (question.answers[0] === answer) setAnswerState(CORRECT);
				else setAnswerState(WRONG);

				setTimeout(() => {
					setUserAnswers((answers) => [...answers, answer]);
					setAnswerState('');
					setChosenAnswer('');
				}, REVEAL_TIME);
			};

			if (answer)
				setTimeout(() => {
					setAnswerState(AWAIT);
					setRevealTimeout();
				}, AWAIT_TIME);
			else {
				setRevealTimeout();
			}
		},
		[question]
	);

	if (!question) return <Results userAnswers={userAnswers} />;

	return (
		<Question
			question={question}
			questionIdx={activeQuestion}
			onSelectAnswer={handleSelectAnswer}
			answerState={answerState}
			chosenAnswer={chosenAnswer}
		/>
	);
};

export default Quiz;
