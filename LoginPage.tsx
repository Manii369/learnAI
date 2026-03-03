import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, GraduationCap, Users, ShieldCheck } from "lucide-react";

const roles: { value: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: "student", label: "Student", icon: <GraduationCap className="h-5 w-5" />, desc: "Access courses & AI recommendations" },
  { value: "teacher", label: "Teacher", icon: <Users className="h-5 w-5" />, desc: "Monitor student progress" },
  { value: "admin", label: "Admin", icon: <ShieldCheck className="h-5 w-5" />, desc: "Platform analytics & management" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, selectedRole);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-primary-foreground/20"
              style={{
                width: `${200 + i * 120}px`,
                height: `${200 + i * 120}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            <BookOpen className="h-10 w-10 text-primary-foreground" />
            <h1 className="text-4xl font-bold font-display text-primary-foreground">LearnAI</h1>
          </div>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            AI-powered personalized learning platform. Get smart recommendations, track progress, and excel in your studies.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <BookOpen className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold font-display text-foreground">LearnAI</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-1">Sign in to continue learning</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-3">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => setSelectedRole(r.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedRole === r.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30"
                }`}
              >
                {r.icon}
                <span className="text-xs font-medium">{r.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Sign in as {roles.find(r => r.value === selectedRole)?.label}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Demo: Click sign in with any role to explore
          </p>
        </div>
      </div>
    </div>
  );
}
