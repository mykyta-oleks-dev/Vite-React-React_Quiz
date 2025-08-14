import questions from '../questions';
import quizComplete from '../assets/quiz-complete.png';

const Results = ({ userAnswers }) => {
	return (
		<div id="summary">
			<img src={quizComplete} alt="quiz-complete" />
			<h2>Quiz is complete!</h2>
			<p>
				Your score is: {calculateScore(userAnswers)}/{questions.length}
			</p>
		</div>
	);
};

const calculateScore = (userAnswers) =>
	questions.reduce(
		(acc, curr, currIdx) =>
			acc + (curr.answers[0] === userAnswers[currIdx] ? 1 : 0),
		0
	);

export default Results;
