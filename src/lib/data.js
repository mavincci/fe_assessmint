// role can be admin or usere


  export const testquestions = [
    {
      "title": "General Knowledge Quiz",
      "questionType": "MCQ",
      "description": "Test your general knowledge with these multiple-choice questions.",
      "questions": [
        {
          "id": "q1",
          "question": "What is the capital of France?",
          "choices": ["Paris", "London", "Berlin", "Madrid"],
          "answer": "Paris"
        },
        {
          "id": "q2",
          "question": "Which planet is known as the Red Planet?",
          "choices": ["Earth", "Mars", "Jupiter", "Venus"],
          "answer": "Mars"
        }
      ]
    },
    {
      "title": "Science Basics",
      "questionType": "True/False",
      "description": "Simple true or false questions about science.",
      "questions": [
        {
          "id": "q3",
          "question": "Water boils at 100 degrees Celsius.",
          "choices": ["True", "False"],
          "answer": "True"
        },
        {
          "id": "q4",
          "question": "The Earth is flat.",
          "choices": ["True", "False"],
          "answer": "False"
        }
      ]
    },
    {
      "title": "Mathematics Challenge",
      "questionType": "MCQ",
      "description": "Test your basic mathematics skills.",
      "questions": [
        {
          "id": "q5",
          "question": "What is 5 + 7?",
          "choices": ["10", "11", "12", "13"],
          "answer": "12"
        },
        {
          "id": "q6",
          "question": "What is the square root of 81?",
          "choices": ["7", "8", "9", "10"],
          "answer": "9"
        }
      ]
    }
  ]
  
  export const sampleTFQuestions = [
  {
    questionText: "Assessment as a Service (AaaS) provides on-demand assessment capabilities?",
    answer: true
  },
  {
    questionText: "AaaS solutions always require significant upfront investment in infrastructure?",
    answer: false
  },
  {
    questionText: "AaaS can help organizations scale their assessment processes more easily?",
    answer: true
  },
  {
    questionText: "AaaS typically handles security and compliance concerns related to assessment data?",
    answer: true
  },
  {
    questionText: "AaaS is generally less flexible than building and maintaining in-house assessment systems?",
    answer: false
  },
  {
    questionText: "AaaS offerings never provide analytics and reporting on assessment results?",
    answer: false
  },
  {
    questionText: "Integration with existing HR systems is a common feature of AaaS platforms?",
    answer: true
  },
  {
    questionText: "AaaS is primarily used only for pre-employment testing?",
    answer: false
  },
  {
    questionText: "AaaS solutions eliminate the need for any internal IT involvement?",
    answer: false
  },
  {
    questionText: "AaaS pricing models are always based on a perpetual license fee?",
    answer: false
  }
];

export const sampleMCQQuestions = [
  {
    questionText: "What is the primary language of instruction in Ethiopian primary schools?",
    options: [
      "Amharic",
      "English",
      "Oromo",
      "Tigrinya"
    ],
    answers: [
      "Amharic",
      "Oromo",
      "Tigrinya"
    ]
  },
  {
    questionText: "Which of the following is a major challenge facing the Ethiopian education system?",
    options: [
      "High enrollment rates",
      "Adequate funding",
      "Shortage of qualified teachers",
      "Excessive technology integration"
    ],
    answers: [
      "Shortage of qualified teachers"
    ]
  },
  {
    questionText: "At what age do children typically begin primary school in Ethiopia?",
    options: [
      "5 years",
      "7 years",
      "6 years",
      "8 years"
    ],
    answers: [
      "7 years"
    ]
  },
  {
    questionText: "What is the structure of the Ethiopian education system in terms of primary and secondary education?",
    options: [
      "6-4-2",
      "8-4",
      "6-2-4",
      "8-2-2"
    ],
    answers: [
      "8-4"
    ]
  },
  {
    questionText: "Which organization is primarily responsible for overseeing and regulating the Ethiopian education system?",
    options: [
      "Ministry of Education",
      "World Bank",
      "UNESCO",
      "African Union"
    ],
    answers: [
      "Ministry of Education"
    ]
  },
  {
    questionText: "What is the purpose of the General Secondary Education Certificate Examination (GSECE) in Ethiopia?",
    options: [
      "Placement in primary schools",
      "Placement in universities",
      "Awarding scholarships",
      "Teacher certification"
    ],
    answers: [
      "Placement in universities"
    ]
  },
  {
    questionText: "Which of the following is a recent initiative aimed at improving access to education in rural Ethiopia?",
    options: [
      "Building more universities",
      "Providing free textbooks",
      "Expanding private schools",
      "Implementing online learning platforms"
    ],
    answers: [
      "Providing free textbooks"
    ]
  },
  {
    questionText: "What is the focus of Technical and Vocational Education and Training (TVET) in Ethiopia?",
    options: [
      "Academic research",
      "Practical skills for employment",
      "Liberal arts education",
      "Teacher training"
    ],
    answers: [
      "Practical skills for employment"
    ]
  },
  {
    questionText: "What is a key goal of the Ethiopian government's education policy?",
    options: [
      "Promoting rote learning",
      "Achieving universal primary education",
      "Reducing the number of universities",
      "Prioritizing private education"
    ],
    answers: [
      "Achieving universal primary education"
    ]
  },
  {
    questionText: "What is the name of the standardized test used for university entrance in Ethiopia?",
    options: [
      "GSECE",
      "ESSLCE",
      "GRE",
      "SAT"
    ],
    answers: [
      "ESSLCE"
    ]
  }
];