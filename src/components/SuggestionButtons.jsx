import { Brain, BookOpen, GraduationCap } from 'lucide-react';

export default function SuggestionButtons({ onSuggestionClick }) {
  const suggestions = [
    { text: 'Generate True/False Questions', icon: <Brain className="w-4 h-4" /> },
    { text: 'Generate MCQ Questions', icon: <BookOpen className="w-4 h-4" /> },
    { text: 'Ask about Education', icon: <GraduationCap className="w-4 h-4" /> }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center p-4">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.text}
          onClick={() => onSuggestionClick(suggestion.text)}
          className="btn btn-outline btn-primary gap-2"
        >
          {suggestion.icon}
          {suggestion.text}
        </button>
      ))}
    </div>
  );
}