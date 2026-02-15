import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Utensils, 
  Dumbbell, 
  Moon, 
  Droplet, 
  TrendingDown, 
  Scale, 
  ChevronRight, 
  ChevronDown, 
  Clock, 
  Flame, 
  Info,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  X,
  Loader2,
  ChefHat,
  BrainCircuit,
  Key
} from 'lucide-react';

// --- DATA CONSTANTS BASED ON PDF ---

const PROFILE = {
  age: 21,
  weight: "69 kg",
  height: "167 cm",
  bmr: 1634,
  tdee: 2533,
  deficitTarget: 2000,
  deficit: 500
};

const MACROS = [
  { name: "Protein", amount: "140g", calories: 560, percent: 28, color: "bg-emerald-500", desc: "Muscle Preservation" },
  { name: "Fats", amount: "65g", calories: 585, percent: 29, color: "bg-amber-500", desc: "Hormonal Health" },
  { name: "Carbs", amount: "215g", calories: 855, percent: 43, color: "bg-blue-500", desc: "Glycogen Resynthesis" }
];

const MEAL_PLAN = [
  {
    name: "Breakfast",
    time: "08:00 AM",
    items: [
      "2 Whole Eggs (Boiled/Poached)",
      "3 Egg Whites (Boiled)",
      "2 Besan Cheela (60g flour)",
      "Mixed Veggies in Cheela"
    ],
    stats: { cals: 500, p: 38.4, c: 41.5, f: 18.6 }
  },
  {
    name: "Mid-Morning",
    time: "11:00 AM",
    items: [
      "100g Greek Yogurt / Hung Curd",
      "15g Almonds (Raw)",
      "1 Medium Apple (150g)"
    ],
    stats: { cals: 264, p: 13.5, c: 28.9, f: 11.8 }
  },
  {
    name: "Lunch",
    time: "02:00 PM",
    items: [
      "50g Soya Chunks (Bhurji style)",
      "50g Black Chana (Boiled)",
      "100g Brown Rice (Cooked)",
      "150g Cucumber & Carrot Salad"
    ],
    stats: { cals: 537, p: 40, c: 77, f: 8.4 }
  },
  {
    name: "Pre/Post Workout",
    time: "05:30 PM",
    items: [
      "1 Scoop Whey Protein (in water)",
      "1 Medium Banana"
    ],
    stats: { cals: 209, p: 25.1, c: 25.8, f: 1.8 }
  },
  {
    name: "Dinner",
    time: "08:30 PM",
    items: [
      "75g Paneer (Sautéed/Grilled)",
      "50g Moong Dal (Thick Stew)",
      "2 Whole Wheat Roti (No Ghee)",
      "150g Palak/Spinach Sabzi"
    ],
    stats: { cals: 581, p: 32.5, c: 67.5, f: 21.5 }
  }
];

const WORKOUT_WEEKS = [
  {
    id: 1,
    title: "Week 1: Foundational Adaptation",
    focus: "Neuromuscular Learning & Form",
    schedule: [
      { day: "Mon", type: "Full Body", exercises: ["Bodyweight Squats (3x12-15)", "Standard Push-Ups (3x10-12)", "Alt. Reverse Lunges (3x10/leg)", "Plank Hold (3x30-40s)"] },
      { day: "Tue", type: "LISS Cardio", exercises: ["Brisk Walking / Light Jogging (35 mins)"] },
      { day: "Wed", type: "Upper & Core", exercises: ["Wide Grip Push-Ups (3x10-12)", "Chair Dips (3x12-15)", "Superman Extensions (3x15)", "Crunches (3x20)"] },
      { day: "Thu", type: "LISS Cardio", exercises: ["Brisk Walking (40 mins)"] },
      { day: "Fri", type: "Lower & Intensity", exercises: ["Glute Bridges (3x20)", "Slow Eccentric Squats (3x15)", "Calf Raises (3x20)", "Mountain Climbers (3x30s)"] },
      { day: "Sat", type: "Active Recovery", exercises: ["Dynamic Stretching / Yoga (25 mins)"] },
      { day: "Sun", type: "Rest", exercises: ["Complete Neurological Rest"] }
    ]
  },
  {
    id: 2,
    title: "Week 2: Volume Accrual",
    focus: "Hypertrophy & Metabolic Capacity",
    schedule: [
      { day: "Mon", type: "Full Body", exercises: ["BW Squats (4x15-20)", "Strict Push-Ups (4x12-15)", "Walking Lunges (3x12/leg)", "Plank Hold (3x45-60s)"] },
      { day: "Tue", type: "HIIT Intro", exercises: ["Circuit (6 Rounds): High Knees (30s) / Rest (30s)", "Jumping Jacks (30s) / Rest (30s)", "Burpees (30s) / Rest (30s)"] },
      { day: "Wed", type: "Upper & Core", exercises: ["Diamond Push-Ups (3x8-12)", "Chair Dips (4x15)", "Inchworms (3x10)", "Bicycle Crunches (3x20/side)"] },
      { day: "Thu", type: "LISS Cardio", exercises: ["Brisk Walking / Jogging (45 mins)"] },
      { day: "Fri", type: "Lower Intensity", exercises: ["Bulgarian Split Squats (3x10/leg)", "Jump Squats (3x12)", "Single Leg Bridges (3x15/leg)", "Plank to Down-Dog (3x16)"] },
      { day: "Sat", type: "Recovery", exercises: ["Mobility Work (30 mins)"] },
      { day: "Sun", type: "Rest", exercises: ["Deep Sleep Focus"] }
    ]
  },
  {
    id: 3,
    title: "Week 3: Mechanical Disadvantage",
    focus: "Leverage Alteration & Tabata",
    schedule: [
      { day: "Mon", type: "Full Body", exercises: ["Pause Squats (2s hold) (4x15)", "Decline Push-Ups (4x10-15)", "Bulgarian Split Squats (4x12/leg)", "Plank Hip Dips (3x20)"] },
      { day: "Tue", type: "Tabata Protocol", exercises: ["Tabata Squat Jumps (8 rounds)", "Tabata Mountain Climbers (8 rounds)", "Tabata Skater Jumps (8 rounds)"] },
      { day: "Wed", type: "Upper/Core", exercises: ["Pseudo-Planche Pushups (3x8-10)", "Pike Push-Ups (4x10-12)", "Superman Pulls (4x15)", "V-Ups (4x15)"] },
      { day: "Thu", type: "LISS Cardio", exercises: ["Fast Paced Jogging (50 mins)"] },
      { day: "Fri", type: "Lower Power", exercises: ["Alt. Jumping Lunges (4x20)", "Single Leg Deadlift (4x15/leg)", "Wall Sit (3x60s)", "Russian Twists (3x40)"] },
      { day: "Sat", type: "Recovery", exercises: ["Lactic Acid Flush Walk (30 mins)"] },
      { day: "Sun", type: "Rest", exercises: ["Rest"] }
    ]
  },
  {
    id: 4,
    title: "Week 4: Metabolic Exhaustion",
    focus: "Supersets & Anaerobic Peaking",
    schedule: [
      { day: "Mon", type: "Full Body Supersets", exercises: ["A1: Jump Squats / A2: Decline Pushups (4 sets)", "B1: Bulgarian Split / B2: Pike Pushups (4 sets)", "C1: Plank / C2: Mtn Climbers (3 sets)"] },
      { day: "Tue", type: "LISS Cardio", exercises: ["Fast Paced Jogging (55 mins)"] },
      { day: "Wed", type: "Upper Supersets", exercises: ["A1: Diamond Pushups / A2: Dips (4 sets)", "B1: Wide Pushups / B2: Supermans (4 sets)", "C1: Bicycles / C2: Leg Raises (3 sets)"] },
      { day: "Thu", type: "HIIT Circuit", exercises: ["Continuous Circuit (45s Work / 15s Rest)", "5 Full Rounds: Burpees, High Knees, Skaters, Jump Lunges"] },
      { day: "Fri", type: "Lower Supersets", exercises: ["A1: Jump Lunges / A2: Squats (4 sets)", "B1: 1-Leg Bridges / B2: Calf Raises (4 sets)", "C1: Wall Sit / C2: Hip Dips (3 sets)"] },
      { day: "Sat", type: "Recovery", exercises: ["Mobility & Walk (30 mins)"] },
      { day: "Sun", type: "Rest", exercises: ["Prepare for new cycle"] }
    ]
  }
];

// --- COMPONENTS ---

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-8 flex items-start space-x-4 animate-fadeIn">
    <div className="p-3 bg-blue-500/10 rounded-xl">
      <Icon className="w-8 h-8 text-blue-400" />
    </div>
    <div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-slate-400 mt-1">{subtitle}</p>
    </div>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

// --- GEMINI AI INTEGRATION ---

const GeminiModal = ({ isOpen, onClose, title, prompt, type }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [tempKey, setTempKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
  if (isOpen && prompt) {
    const savedKey = localStorage.getItem("GEMINI_API_KEY");
    
    // 👇 UPDATE THIS SECTION
    // Access the environment variable provided by Vite
    const envKey = import.meta.env.VITE_GEMINI_API_KEY; 

    // Logic: Use Env key if available, otherwise fall back to user input
    if (!savedKey && !envKey) {
      setShowKeyInput(true);
    } else {
      fetchGeminiResponse(savedKey || envKey);
    }
  }
  // ... rest of effect
}, [isOpen, prompt]);

  const saveKeyAndFetch = () => {
    if (tempKey.trim()) {
      localStorage.setItem("GEMINI_API_KEY", tempKey.trim());
      setShowKeyInput(false);
      fetchGeminiResponse(tempKey.trim());
    }
  };

  const fetchGeminiResponse = async (apiKey) => {
    setLoading(true);
    setError(null);
    
    if (!apiKey) {
      setError("API Key missing. Please provide a key.");
      setShowKeyInput(true);
      setLoading(false);
      return;
    }

    const systemInstruction = type === 'recipe' 
      ? "You are an expert Indian nutritionist and chef. Create a concise, tasty recipe for the requested meal that STRICTLY follows the provided calorie and macro constraints. Use bullet points."
      : type === 'form' 
      ? "You are an elite strength coach. Provide 3-4 critical, actionable form cues for the exercise to maximize hypertrophy and safety. Be concise and authoritative."
      : "You are a tough but encouraging sports physiologist. Give a 3-sentence daily briefing focusing on the physiological goal of the day.";

    try {
      const result = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemInstruction }] }
          }),
        }
      );

      if (!result.ok) throw new Error("Coach AI is currently offline or Key is Invalid.");
      
      const data = await result.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
      setResponse(text);
    } catch (err) {
      setError(err.message);
      // If error is likely auth related, show input again
      if (err.message.includes("Invalid")) setShowKeyInput(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-blue-500/30 rounded-2xl w-full max-w-lg shadow-2xl shadow-blue-900/50 flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-blue-400">
            {type === 'recipe' ? <ChefHat size={20} /> : <BrainCircuit size={20} />}
            <h3 className="font-bold text-white">{title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {showKeyInput ? (
            <div className="text-center py-6">
              <Key className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h4 className="text-white font-bold mb-2">API Key Required</h4>
              <p className="text-slate-400 text-sm mb-4">
                To use the AI features, please enter your Google Gemini API Key. 
                <br/><span className="text-xs text-slate-500">(It will be saved locally in your browser)</span>
              </p>
              <input 
                type="password" 
                placeholder="Enter Gemini API Key" 
                className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
              />
              <button 
                onClick={saveKeyAndFetch}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-colors"
              >
                Save & Connect
              </button>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
              <p className="text-sm font-mono animate-pulse">Consulting Neural Network...</p>
            </div>
          ) : error ? (
            <div className="text-red-400 text-center py-8">
              <p>{error}</p>
              <button onClick={() => setShowKeyInput(true)} className="mt-4 text-xs underline">Update API Key</button>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
               <div className="whitespace-pre-line leading-relaxed text-slate-300">
                  {response}
               </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 rounded-b-2xl">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
            <Sparkles size={12} className="text-purple-400" />
            <span>Powered by Gemini 2.5 Flash</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FatLossApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeWeek, setActiveWeek] = useState(1);
  const [expandedMeal, setExpandedMeal] = useState(null);
  
  // AI Modal State
  const [aiModal, setAiModal] = useState({ isOpen: false, title: "", prompt: "", type: "" });

  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  const openAiCoach = (title, prompt, type) => {
    setAiModal({ isOpen: true, title, prompt, type });
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Daily Briefing AI Button */}
      <div className="flex justify-end">
        <button 
          onClick={() => openAiCoach(
            "Daily Physiological Briefing", 
            `Provide a motivating daily briefing for Week ${activeWeek} of a fat loss protocol. The focus of the week is ${WORKOUT_WEEKS[activeWeek-1].focus}. The user is active and ovo-vegetarian.`,
            "briefing"
          )}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all hover:scale-105"
        >
          <Sparkles size={16} />
          <span>Generate Daily Focus</span>
        </button>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex flex-col items-center justify-center py-8 bg-gradient-to-br from-slate-800 to-slate-900">
          <Scale className="w-8 h-8 text-indigo-400 mb-3" />
          <span className="text-3xl font-bold text-white">{PROFILE.weight}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Current Mass</span>
        </Card>
        <Card className="flex flex-col items-center justify-center py-8 bg-gradient-to-br from-slate-800 to-slate-900">
          <Flame className="w-8 h-8 text-rose-400 mb-3" />
          <span className="text-3xl font-bold text-white">{PROFILE.tdee}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Maintenance (Kcal)</span>
        </Card>
        <Card className="flex flex-col items-center justify-center py-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-all duration-500"></div>
          <TrendingDown className="w-8 h-8 text-emerald-400 mb-3 relative z-10" />
          <span className="text-3xl font-bold text-white relative z-10">{PROFILE.deficitTarget}</span>
          <span className="text-xs text-emerald-200/70 uppercase tracking-wider mt-1 relative z-10">Target Intake</span>
        </Card>
        <Card className="flex flex-col items-center justify-center py-8 bg-gradient-to-br from-slate-800 to-slate-900">
          <Activity className="w-8 h-8 text-blue-400 mb-3" />
          <span className="text-3xl font-bold text-white">{PROFILE.deficit}</span>
          <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Daily Deficit</span>
        </Card>
      </div>

      {/* Macro Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Macronutrient Partitioning</h3>
            <Badge color="blue">Daily Targets</Badge>
          </div>
          <div className="space-y-6">
            {MACROS.map((macro) => (
              <div key={macro.name} className="group">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">{macro.name}</span>
                  <span className="text-white font-bold">{macro.amount} <span className="text-slate-500 font-normal">({macro.percent}%)</span></span>
                </div>
                <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${macro.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: loaded ? `${macro.percent}%` : '0%' }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2 group-hover:text-slate-300 transition-colors">{macro.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Metabolic Summary */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-slate-900 border-blue-500/20">
          <h3 className="text-xl font-semibold text-white mb-4">Physiological Strategy</h3>
          <p className="text-slate-300 leading-relaxed text-sm mb-4">
            The objective is maximum reduction of adipose tissue while preserving lean skeletal muscle mass. 
            This is governed by a precise <span className="text-emerald-400 font-bold">500 kcal deficit</span> combined with 
            <span className="text-amber-400 font-bold"> high protein intake (2.2g/kg)</span>.
          </p>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <Clock className="w-5 h-5 text-blue-400 mr-3" />
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="text-white font-medium">4-Week Mesocycle</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <Dumbbell className="w-5 h-5 text-rose-400 mr-3" />
              <div>
                <p className="text-xs text-slate-400">Training Style</p>
                <p className="text-white font-medium">Progressive Bodyweight + HIIT</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderNutrition = () => (
    <div className="space-y-6">
      <SectionTitle 
        icon={Utensils} 
        title="Ovo-Vegetarian Protocol" 
        subtitle="2000 Kcal | 140g Protein | 65g Fat | 215g Carbs"
      />
      
      <div className="grid gap-4">
        {MEAL_PLAN.map((meal, idx) => (
          <div 
            key={idx} 
            className={`
              bg-slate-800 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300
              ${expandedMeal === idx ? 'ring-2 ring-blue-500/50 shadow-lg shadow-blue-900/20' : 'hover:border-slate-600'}
            `}
          >
            <div 
              className="p-5 flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedMeal(expandedMeal === idx ? null : idx)}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-slate-700 p-2 rounded-lg text-slate-300 font-mono text-sm">
                  {meal.time}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{meal.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {meal.stats.cals} kcal • {meal.stats.p}g Protein
                  </p>
                </div>
              </div>
              {expandedMeal === idx ? <ChevronDown className="text-blue-400" /> : <ChevronRight className="text-slate-500" />}
            </div>
            
            {/* Expanded Content */}
            <div className={`
              overflow-hidden transition-all duration-300 ease-in-out bg-slate-900/30
              ${expandedMeal === idx ? 'max-h-96 opacity-100 border-t border-slate-700' : 'max-h-0 opacity-0'}
            `}>
              <div className="p-5">
                <ul className="space-y-2 mb-4">
                  {meal.items.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-4">
                   <div className="flex space-x-2 text-xs font-mono">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded">C: {meal.stats.c}g</span>
                    <span className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded">F: {meal.stats.f}g</span>
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">P: {meal.stats.p}g</span>
                  </div>
                  {/* AI Recipe Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openAiCoach(
                        `Chef AI: ${meal.name}`,
                        `Create a detailed Indian Ovo-Vegetarian recipe for "${meal.items.join(', ')}". It must strictly provide around ${meal.stats.cals} calories, ${meal.stats.p}g protein, and ${meal.stats.f}g fat. Include spice mix suggestions.`,
                        "recipe"
                      );
                    }}
                    className="flex items-center space-x-1 text-xs bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-full hover:bg-purple-500/30 transition-colors border border-purple-500/30"
                  >
                    <Sparkles size={12} />
                    <span>Get Recipe Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {['Eggs', 'Soya Chunks', 'Paneer', 'Whey Isolate'].map((food) => (
          <div key={food} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
            <span className="text-slate-400 text-xs uppercase tracking-widest">Key Source</span>
            <p className="text-white font-bold mt-1">{food}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-6">
       <SectionTitle 
        icon={Dumbbell} 
        title="Biomechanical Conditioning" 
        subtitle="4-Week Progressive Overload Mesocycle"
      />

      {/* Week Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {WORKOUT_WEEKS.map((week) => (
          <button
            key={week.id}
            onClick={() => setActiveWeek(week.id)}
            className={`
              flex-1 min-w-[120px] px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border
              ${activeWeek === week.id 
                ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/50' 
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'}
            `}
          >
            Week {week.id}
          </button>
        ))}
      </div>

      {/* Active Week Content */}
      <div className="animate-fadeIn">
        <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-xl flex items-start">
          <Info className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-blue-100 font-semibold">{WORKOUT_WEEKS[activeWeek-1].title}</h4>
            <p className="text-blue-300/80 text-sm mt-1">{WORKOUT_WEEKS[activeWeek-1].focus}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WORKOUT_WEEKS[activeWeek-1].schedule.map((day, idx) => (
            <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-colors group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-2 py-1 rounded">{day.day}</span>
                <Badge color={day.type.includes("Rest") ? "emerald" : day.type.includes("HIIT") ? "rose" : "blue"}>
                  {day.type}
                </Badge>
              </div>
              <ul className="space-y-3">
                {day.exercises.map((ex, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-center justify-between group/item">
                    <div className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-slate-600 mr-1 mt-0.5 flex-shrink-0" />
                      <span>{ex}</span>
                    </div>
                    {/* AI Form Coach Button */}
                    <button
                      onClick={() => openAiCoach(
                        `Form Coach: ${ex.split('(')[0]}`,
                        `Explain the proper biomechanical form for "${ex}" to maximize safety and hypertrophy. Include 3 bullet points on "Mind-Muscle Connection".`,
                        "form"
                      )}
                      className="opacity-0 group-hover/item:opacity-100 transition-opacity p-1 bg-blue-500/20 rounded text-blue-400 hover:text-white"
                      title="Get AI Form Cues"
                    >
                      <BrainCircuit size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecovery = () => (
    <div className="space-y-6">
      <SectionTitle 
        icon={Moon} 
        title="Systemic Recovery" 
        subtitle="Endocrine Regulation & Hydration"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-indigo-500/20 bg-indigo-900/10">
          <div className="flex items-center mb-4 text-indigo-400">
            <Moon className="w-6 h-6 mr-3" />
            <h3 className="text-lg font-bold">Sleep Architecture</h3>
          </div>
          <p className="text-sm text-slate-300 mb-4 leading-relaxed">
            Non-negotiable 7-8 hours. Deep slow-wave sleep is where hGH is secreted for tissue repair.
            Lack of sleep elevates ghrelin (hunger) and cortisol (catabolism).
          </p>
          <ul className="space-y-2">
            <li className="flex items-center text-xs font-mono text-indigo-300 bg-indigo-900/30 p-2 rounded">
              <PlayCircle className="w-3 h-3 mr-2" /> No screens 1hr pre-bed
            </li>
            <li className="flex items-center text-xs font-mono text-indigo-300 bg-indigo-900/30 p-2 rounded">
              <PlayCircle className="w-3 h-3 mr-2" /> Temperature: 18-20°C
            </li>
          </ul>
        </Card>

        <Card className="border-cyan-500/20 bg-cyan-900/10">
          <div className="flex items-center mb-4 text-cyan-400">
            <Droplet className="w-6 h-6 mr-3" />
            <h3 className="text-lg font-bold">Hydration Kinetics</h3>
          </div>
          <p className="text-sm text-slate-300 mb-4 leading-relaxed">
            Lipolysis requires water. 1g of glycogen holds 3-4g water. As you deplete glycogen, you lose water weight.
            Target: 3.5 - 4 Liters/day.
          </p>
          <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2">
            <div className="bg-cyan-500 h-2.5 rounded-full w-[75%]"></div>
          </div>
          <p className="text-xs text-center text-cyan-300">Daily Target: 4000ml</p>
        </Card>

        <Card className="col-span-1 md:col-span-2 border-slate-700">
            <h3 className="text-lg font-bold text-white mb-2">Progressive Monitoring</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-slate-900 p-4 rounded-lg">
                    <p className="text-slate-400 text-xs uppercase mb-1">Weigh-In Protocol</p>
                    <p className="text-white text-sm">Daily, upon waking, post-urination. Compare 7-day averages only.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                    <p className="text-slate-400 text-xs uppercase mb-1">NEAT Target</p>
                    <p className="text-white text-sm">8,000 - 10,000 Steps daily outside of training.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                    <p className="text-slate-400 text-xs uppercase mb-1">Plateau Breaker</p>
                    <p className="text-white text-sm">If stalled 2 weeks: Check adherence first, then increase NEAT.</p>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* AI Modal */}
      <GeminiModal 
        isOpen={aiModal.isOpen} 
        onClose={() => setAiModal({ ...aiModal, isOpen: false })} 
        title={aiModal.title} 
        prompt={aiModal.prompt}
        type={aiModal.type}
      />

      {/* Navigation */}
      <nav className="fixed bottom-0 w-full bg-slate-900/90 backdrop-blur-md border-t border-slate-800 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between md:justify-start md:space-x-10 h-16 items-center">
            {/* Logo area hidden on mobile to save space, visible on desktop */}
            <div className="hidden md:flex items-center space-x-2 mr-auto">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingDown className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-white tracking-tight">LIPOLYSIS PROTOCOL</span>
            </div>

            {/* Nav Items */}
            {[
              { id: 'dashboard', icon: Activity, label: 'Overview' },
              { id: 'nutrition', icon: Utensils, label: 'Nutrition' },
              { id: 'training', icon: Dumbbell, label: 'Training' },
              { id: 'recovery', icon: Moon, label: 'Recovery' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  flex flex-col md:flex-row items-center justify-center md:space-x-2 py-2 px-2 md:px-4 rounded-lg transition-all
                  ${activeTab === item.id ? 'text-blue-400 bg-blue-500/5' : 'text-slate-500 hover:text-slate-300'}
                `}
              >
                <item.icon className={`w-6 h-6 md:w-5 md:h-5 ${activeTab === item.id ? 'animate-bounce-subtle' : ''}`} />
                <span className="text-[10px] md:text-sm font-medium mt-1 md:mt-0">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 pt-8 pb-24 md:pt-24 md:pb-12">
        <div className="mb-6 md:hidden flex items-center space-x-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingDown className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-white tracking-tight">LIPOLYSIS PROTOCOL</span>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'nutrition' && renderNutrition()}
        {activeTab === 'training' && renderTraining()}
        {activeTab === 'recovery' && renderRecovery()}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-6 mb-16 md:mb-0 border-t border-slate-800 text-center">
        <p className="text-slate-600 text-xs">
          Generated from "Custom Fat Loss Plan.pdf" • Medical Disclaimer: Consult a physician before starting.
        </p>
      </footer>

    </div>
  );
}