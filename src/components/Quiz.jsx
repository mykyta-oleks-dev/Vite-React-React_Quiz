import { useCallback, useState } from 'react';
import questions from '../questions';
import Question from './Question';
import Results from './Results';

const Quiz = () => {
	const [userAnswers, setUserAnswers] = useState([]);
	const activeQuestion = userAnswers.length;

	const question = questions[activeQuestion];

	const handleSelectAnswer = useCallback((answer) => {
		setUserAnswers((answers) => [...answers, answer]);
	}, []);

	if (!question) return <Results userAnswers={userAnswers} />;

	return (
		<Question
			question={question}
			questionIdx={activeQuestion}
			onSelectAnswer={handleSelectAnswer}
		/>
	);
};

export default Quiz;
