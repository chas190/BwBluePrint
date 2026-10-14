import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface Question {
  id: string;
  question_text: string;
  statement_text?: string;
  image_url?: string;
  question_order: number;
  group_id: string;
}

interface Option {
  id: string;
  option_text: string;
  option_order: number;
  is_correct: boolean;
}

interface QuestionResponse {
  id: string;
  is_success_response: boolean;
  response_text: string;
  next_question_id?: string;
}

export default function Question() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<QuestionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [questionProgress, setQuestionProgress] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const groupId = searchParams.get("group") || "default";
  const questionId = searchParams.get("q");

  useEffect(() => {
    loadQuestion();
  }, [questionId, groupId]);

  const loadQuestion = async () => {
    try {
      setLoading(true);
      
      // Get total questions in group for progress
      const { data: totalData } = await supabase
        .from("info_questions")
        .select("id")
        .eq("group_id", groupId);
      
      setTotalQuestions(totalData?.length || 0);

      let query = supabase
        .from("info_questions")
        .select("*");

      if (questionId) {
        query = query.eq("id", questionId);
      } else {
        query = query
          .eq("group_id", groupId)
          .order("question_order")
          .limit(1);
      }

      const { data: question, error: questionError } = await query.single();

      if (questionError) {
        console.error("Error loading question:", questionError);
        toast.error("Failed to load question");
        return;
      }

      setCurrentQuestion(question);
      setQuestionProgress(question.question_order);

      // Load options
      const { data: optionsData, error: optionsError } = await supabase
        .from("info_q_options")
        .select("*")
        .eq("question_id", question.id)
        .order("option_order");

      if (optionsError) {
        console.error("Error loading options:", optionsError);
      } else {
        setOptions(optionsData || []);
      }

      // Load responses
      const { data: responsesData, error: responsesError } = await supabase
        .from("info_question_responses")
        .select("*")
        .eq("question_id", question.id);

      if (responsesError) {
        console.error("Error loading responses:", responsesError);
      } else {
        setResponses(responsesData || []);
      }

    } catch (error) {
      console.error("Error in loadQuestion:", error);
      toast.error("Failed to load question");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = async (optionId: string) => {
    if (showResponse) return;
    
    setSelectedOption(optionId);
    const option = options.find(o => o.id === optionId);
    
    if (!option || !currentQuestion) return;

    // Save user response
    const { data: user } = await supabase.auth.getUser();
    
    if (user.user) {
      await supabase.from("info_user_responses").insert({
        user_id: user.user.id,
        question_id: currentQuestion.id,
        selected_option_id: optionId,
        is_correct: option.is_correct,
        group_id: currentQuestion.group_id
      });
    }

    // Find appropriate response
    const response = responses.find(r => 
      r.is_success_response === option.is_correct
    ) || responses.find(r => r.is_success_response === option.is_correct);

    setCurrentResponse(response || null);
    setShowResponse(true);
  };

  const handleContinue = () => {
    if (!currentResponse || !currentQuestion) return;

    if (currentResponse.next_question_id) {
      navigate(`/info/question?q=${currentResponse.next_question_id}&group=${currentQuestion.group_id}`);
    } else {
      // Check if this is the last question in the group
      navigate(`/info/group-complete?group=${currentQuestion.group_id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading question...</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">No Question Found</h2>
            <Button onClick={() => navigate("/info")}>
              Back to Cover
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {questionProgress}</span>
            <span>{totalQuestions} Total</span>
          </div>
          <Progress value={(questionProgress / totalQuestions) * 100} />
        </div>

        {/* Question Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {/* Image */}
            {currentQuestion.image_url && (
              <div className="w-full h-64 md:h-80 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <img 
                  src={currentQuestion.image_url} 
                  alt="" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            
            <div className="p-6 space-y-6">
              {/* Statement */}
              {currentQuestion.statement_text && (
                <div className="text-center">
                  <p className="text-lg text-muted-foreground">
                    {currentQuestion.statement_text}
                  </p>
                </div>
              )}

              {/* Question */}
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  {currentQuestion.question_text}
                </h2>
              </div>

              {/* Response Display */}
              {showResponse && currentResponse && (
                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <p className="text-center text-lg mb-4">
                      {currentResponse.response_text}
                    </p>
                    <div className="text-center">
                      <Button onClick={handleContinue} size="lg">
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Options */}
              {!showResponse && (
                <div className="grid gap-3 md:gap-4">
                  {options.slice(0, 6).map((option) => (
                    <Button
                      key={option.id}
                      variant={selectedOption === option.id ? "default" : "outline"}
                      className="p-4 h-auto text-left justify-start text-wrap"
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={!!selectedOption}
                    >
                      <span className="mr-3 font-bold">
                        {String.fromCharCode(65 + option.option_order - 1)}.
                      </span>
                      {option.option_text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
