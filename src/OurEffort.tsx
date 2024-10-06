import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import AkoImage from "./assets/Ako.png";
import "./OurEffort.css"; // Import the CSS file

export const OurEffort: React.FC = () => {
  const globeEl = useRef<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false); // Track if the quiz is over

  // Quiz questions and answers
  const quizQuestions = [
    {
      question: "What can we do to reduce CO2 emissions?",
      options: [
        "Use fossil fuels",
        "Switch to renewable energy",
        "Cut down trees",
        "Drive more cars",
      ],
      correctAnswer: "Switch to renewable energy",
      explanation:
        "Switching to renewable energy like solar and wind helps reduce CO2 emissions!",
    },
    {
      question: "How can we help prevent wildfires?",
      options: [
        "Plant more trees",
        "Leave dry plants",
        "Start campfires",
        "Let forests dry",
      ],
      correctAnswer: "Plant more trees",
      explanation:
        "Planting trees helps reduce wildfires by maintaining moist soil and absorbing CO2.",
    },
    {
      question: "Why is it important to save water?",
      options: [
        "To create more rivers",
        "To reduce droughts",
        "To cause floods",
        "To pollute water",
      ],
      correctAnswer: "To reduce droughts",
      explanation:
        "Saving water helps reduce the chances of droughts, which can lead to wildfires.",
    },
    {
      question: "Which policy should we support to fight climate change?",
      options: [
        "Policies to protect fossil fuels",
        "Policies to reduce emissions",
        "Policies to build factories",
        "Policies to pollute the air",
      ],
      correctAnswer: "Policies to reduce emissions",
      explanation:
        "Supporting policies that reduce emissions is crucial for fighting climate change.",
    },
  ];

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1); // Increase score if the answer is correct
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null); // Reset selected answer

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    } else {
      setIsQuizFinished(true); // End the quiz if there are no more questions
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0); // Restart from the first question
    setScore(0); // Reset the score
    setSelectedAnswer(null); // Reset the selected answer
    setIsQuizFinished(false); // Start the quiz again
  };

  // Function to create the starfield in the distant background
  const addStarfield = (scene: THREE.Scene) => {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const starVertices = [];
    const distance = 4000;
    for (let i = 0; i < 10000; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = distance * Math.cos(phi);
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
  };

  useEffect(() => {
    if (globeEl.current) {
      const scene = globeEl.current.scene();
      addStarfield(scene);

      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <div className="globe-container">
      {/* Globe component */}
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="black"
        animateIn={true}
      />

      {/* Fixed image at the bottom-right (clickable koala image) */}
      <img
        src={AkoImage}
        alt="Ako the Koala"
        className="ako-image"
        onClick={handleNextQuestion} // Move to the next question on click
      />

      {/* Speech Bubble */}
      {!isQuizFinished ? (
        <div className="speech-bubble">
          <p>{quizQuestions[currentQuestionIndex].question}</p>
          <div>
            {quizQuestions[currentQuestionIndex].options.map(
              (option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${
                    selectedAnswer === option ? "selected-option" : ""
                  }`}
                  onClick={() => handleAnswerSelection(option)}
                  disabled={!!selectedAnswer} // Disable selection after an answer is chosen
                >
                  {option}
                </button>
              )
            )}
          </div>

          {/* Show explanation and feedback */}
          {selectedAnswer && (
            <div>
              <p
                className={`feedback ${
                  selectedAnswer ===
                  quizQuestions[currentQuestionIndex].correctAnswer
                    ? "correct"
                    : "incorrect"
                }`}
              >
                {selectedAnswer ===
                quizQuestions[currentQuestionIndex].correctAnswer
                  ? "Correct!"
                  : "Incorrect!"}
              </p>
              <p>{quizQuestions[currentQuestionIndex].explanation}</p>
              <button
                className="next-question-button"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            </div>
          )}

          <div className="arrow" />
        </div>
      ) : (
        <div className="speech-bubble">
          <h2>Quiz Finished!</h2>
          <p>
            Your Score: {score} / {quizQuestions.length}
          </p>
          <button className="next-question-button" onClick={handleRestartQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};
