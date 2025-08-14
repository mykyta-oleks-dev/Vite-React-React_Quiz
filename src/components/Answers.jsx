import { useRef } from 'react';
import { ANSWERED } from '../answerStates';

const Answers = ({
	answers,
	answerState,
	chosenAnswer,
	correctAnswer,
	onSelectAnswer,
}) => {
	const shuffledAnswers = useRef(null);

	if (!shuffledAnswers.current) {
		shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
	}

	return (
		<ul id="answers">
			{shuffledAnswers.current.map((a) => {
				const className = deriveClass(
					a,
					chosenAnswer,
					answerState,
					correctAnswer
				);
				return (
					<li key={a} className="answer">
						<button
							type="button"
							onClick={() => onSelectAnswer(a)}
							className={className}
							disabled={!!chosenAnswer}
						>
							{a}
						</button>
					</li>
				);
			})}
		</ul>
	);
};

function deriveClass(answer, chosenAnswer, answerState, correctAnswer) {
	if (!answerState) return '';

	if (answerState === ANSWERED) {
		if (answer === chosenAnswer) return 'selected';
		return '';
	} else {
		if (answer === correctAnswer) return 'correct';
		else if (answer === chosenAnswer) return 'wrong';
		return '';
	}
}

export default Answers;
