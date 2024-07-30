import { type Setting, QuestionType } from "@comitter/shared/types"

export const config: Setting = {
  name: "Personnal config",
  templating: (answers) => {
    return `${answers[0].formattedValue}: ${answers[1].formattedValue} by ${answers[2].formattedValue} (${answers[3].formattedValue})`
  },
  questions: [
    {
      id: 'type',
      type: QuestionType.Select,
      options: [
        {
          id: "feat",
          title: "📖 Feature",
          value: "📖 Feat"
        },
        {
          id: "fix",
          title: "📦 Fix",
          value: "📦 Fix"
        }
      ],
      tips: "Here is a custom tip",
      title: "Which type of commit is it ?"
    },
    {
      id: "content",
      type: QuestionType.String,
      title: "What did you do ?",
      tips: "Tips is here",
      placeholder: "Coding",
      validator: (value) => typeof value === "string" && value.length > 2
    },
    {
      id: "author",
      type: QuestionType.String,
      title: "What's your name ?",
      placeholder: "Kevin",
      validator: (value) => typeof value === "string" && value.length > 1
    },
    {
      id: "age",
      type: QuestionType.Number,
      title: "How old are you ?",
      placeholder: "18",
      validator: (value) => parseInt(value.toString()) > 0
    }
  ]
}