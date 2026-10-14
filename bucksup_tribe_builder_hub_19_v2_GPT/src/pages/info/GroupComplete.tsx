import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star } from "lucide-react";

interface GroupOption {
  id: string;
  option_text: string;
  option_order: number;
  next_group_id?: string;
}

export default function GroupComplete() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [groupOptions, setGroupOptions] = useState<GroupOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({ correct: 0, total: 0 });

  const groupId = searchParams.get("group") || "default";

  useEffect(() => {
    loadGroupData();
  }, [groupId]);

  const loadGroupData = async () => {
    try {
      setLoading(true);

      // Load group completion options
      const { data: options, error: optionsError } = await supabase
        .from("info_group_options")
        .select("*")
        .eq("group_id", groupId)
        .order("option_order");

      if (optionsError) {
        console.error("Error loading group options:", optionsError);
      } else {
        setGroupOptions(options || []);
      }

      // Load user stats for this group
      const { data: user } = await supabase.auth.getUser();
      
      if (user.user) {
        const { data: responses } = await supabase
          .from("info_user_responses")
          .select("is_correct")
          .eq("user_id", user.user.id)
          .eq("group_id", groupId);

        if (responses) {
          const total = responses.length;
          const correct = responses.filter(r => r.is_correct).length;
          setUserStats({ correct, total });
        }
      }

    } catch (error) {
      console.error("Error loading group data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option: GroupOption) => {
    if (option.next_group_id) {
      navigate(`/info/question?group=${option.next_group_id}`);
    } else {
      navigate("/info");
    }
  };

  const getScoreMessage = () => {
    const percentage = userStats.total > 0 ? (userStats.correct / userStats.total) * 100 : 0;
    
    if (percentage === 100) return "Perfect Score! 🎉";
    if (percentage >= 80) return "Excellent Work! ⭐";
    if (percentage >= 60) return "Good Job! 👍";
    return "Keep Learning! 💪";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Completion Header */}
        <Card className="text-center overflow-hidden">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex justify-center">
                <Trophy className="w-16 h-16 text-yellow-500" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Group Complete!</h1>
                <p className="text-xl text-muted-foreground">
                  {getScoreMessage()}
                </p>
              </div>

              {/* Score Display */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {userStats.correct}
                    </div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {userStats.total}
                    </div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {userStats.total > 0 ? Math.round((userStats.correct / userStats.total) * 100) : 0}%
                    </div>
                    <div className="text-sm text-muted-foreground">Score</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Group Options */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center">What's Next?</h2>
              
              <div className="space-y-3">
                {groupOptions.length > 0 ? (
                  groupOptions.slice(0, 3).map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      className="w-full p-4 h-auto text-left justify-start"
                      onClick={() => handleOptionSelect(option)}
                    >
                      <Star className="w-4 h-4 mr-3" />
                      {option.option_text}
                    </Button>
                  ))
                ) : (
                  <Button
                    variant="outline"
                    className="w-full p-4"
                    onClick={() => navigate("/info")}
                  >
                    Continue
                  </Button>
                )}
                
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => navigate("/info")}
                >
                  Back to Cover
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
