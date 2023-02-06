import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import DownIcon from '@/public/down.png';

interface Answer {
  answer: string;
}

interface QA {
  question: string;
  answers: Answer[];
}

// const inter = Inter({ subsets: ['latin'] });

const qas: QA[] = [
  {
    question: 'How to learn react js',
    answers: [
      {
        answer: 'Watch Youtube video',
      },
      {
        answer: 'Learn from blogs',
      },
      {
        answer: 'Take part in camp',
      },
    ],
  },
  {
    question: 'How to learn typescript',
    answers: [
      {
        answer: 'Watch Youtube video',
      },
      {
        answer: 'Learn from blogs',
      },
      {
        answer: 'Take part in camp',
      },
    ],
  },
];

export default function Home() {
  const [searched, setSearched] = useState<boolean>(false);
  const [data, setData] = useState(qas);
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<QA[]>([]);
  const [openedQuestions, setOpenedQuestions] = useState<string[]>([]);

  useEffect(() => {
    setAnswers(qas);
  }, []);

  const handleSearch = () => {
    if (!question) {
      return;
    }

    setSearched(true);
    let answersMatched: QA[] = [];
    for (let item of data) {
      if (new RegExp(`.*${question}.*`, 'i').test(item.question)) {
        answersMatched = answersMatched.concat(item);
      }
    }

    setAnswers(answersMatched);
  };

  const handleClickExpand = (question: string) => {
    if (openedQuestions.includes(question)) {
      setOpenedQuestions(openedQuestions.filter((item) => item !== question));
    } else {
      setOpenedQuestions([...openedQuestions, question]);
    }
  };

  const handleClickAsk = () => {
    const question = window.prompt('Enter your question here...');
  };

  const handleClickAnswer = (question: QA) => {
    const answer = window.prompt('Enter your answer here...');
  };

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>FAQ</h1>
        <div className={styles.formbox}>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyUp={handleSearch}
            placeholder={'Enter your question here...'}
            className={styles.textbox}
          />
          <button onClick={handleSearch} className={styles.search}>
            Search
          </button>
          <button className={styles.ask} onClick={handleClickAsk}>
            {' '}
            Ask
          </button>
        </div>
        {searched && answers.length === 0 && <h3>No Results</h3>}
        <ul className={styles.answerList}>
          {answers.map((answer, index) => {
            const open = openedQuestions.includes(answer.question);
            return (
              <li key={answer.question}>
                <h3 className={styles.question}>
                  <span>Question: {answer.question}</span>
                  <img
                    className={open ? styles.up : styles.down}
                    onClick={() => handleClickExpand(answer.question)}
                    src={DownIcon.src}
                    width={30}
                  />
                </h3>
                {open && (
                  <ul className={styles.answerList}>
                    <li
                      onClick={() => handleClickAnswer(answer)}
                      className={styles.answerItem}
                      key={'answer'}
                    >
                      Answer this question
                    </li>
                    {answer.answers.map((answer, index) => {
                      return (
                        <li key={answer.answer}>
                          {index + 1}. {answer.answer}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
