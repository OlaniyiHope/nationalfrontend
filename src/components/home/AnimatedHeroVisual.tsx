import { BookOpen, GraduationCap, FileText, Users, Lightbulb, Globe } from "lucide-react";

export function AnimatedHeroVisual() {
  return (
    <div className="relative w-full h-80 flex items-center justify-center">
      {/* Central glowing orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-accent/30 animate-pulse blur-xl" />
      </div>
      
      {/* Orbiting elements */}
      <div className="relative w-72 h-72">
        {/* Central book icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
            <BookOpen className="w-10 h-10 text-accent" />
          </div>
        </div>
        
        {/* Orbiting icons */}
        <div className="absolute inset-0 animate-spin-slow">
          {/* Top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          
          {/* Top Right */}
          <div className="absolute top-[15%] right-[5%]">
            <div className="w-10 h-10 rounded-full bg-accent/40 backdrop-blur-sm flex items-center justify-center shadow-lg animate-bounce-slow">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          
          {/* Bottom Right */}
          <div className="absolute bottom-[15%] right-[5%]">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Users className="w-7 h-7 text-accent" />
            </div>
          </div>
          
          {/* Bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
            <div className="w-11 h-11 rounded-full bg-accent/30 backdrop-blur-sm flex items-center justify-center shadow-lg animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
              <Globe className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          
          {/* Bottom Left */}
          <div className="absolute bottom-[15%] left-[5%]">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Lightbulb className="w-5 h-5 text-accent" />
            </div>
          </div>
          
          {/* Top Left */}
          <div className="absolute top-[15%] left-[5%]">
            <div className="w-12 h-12 rounded-full bg-accent/25 backdrop-blur-sm flex items-center justify-center shadow-lg animate-bounce-slow" style={{ animationDelay: '1s' }}>
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </div>
        
        {/* Floating journal pages */}
        <div className="absolute top-1/4 right-0 animate-float">
          <div className="w-16 h-20 bg-primary-foreground/90 rounded shadow-xl transform rotate-12 flex flex-col p-2">
            <div className="h-1 w-10 bg-accent rounded mb-1" />
            <div className="h-0.5 w-8 bg-muted-foreground/30 rounded mb-0.5" />
            <div className="h-0.5 w-12 bg-muted-foreground/30 rounded mb-0.5" />
            <div className="h-0.5 w-6 bg-muted-foreground/30 rounded" />
          </div>
        </div>
        
        <div className="absolute bottom-1/4 left-0 animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="w-14 h-18 bg-primary-foreground/80 rounded shadow-xl transform -rotate-6 flex flex-col p-2">
            <div className="h-1 w-8 bg-accent rounded mb-1" />
            <div className="h-0.5 w-10 bg-muted-foreground/30 rounded mb-0.5" />
            <div className="h-0.5 w-6 bg-muted-foreground/30 rounded" />
          </div>
        </div>
        
        {/* Connecting lines / network effect */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 288 288">
          <circle cx="144" cy="144" r="80" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary-foreground" strokeDasharray="4 4" />
          <circle cx="144" cy="144" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-foreground" strokeDasharray="2 6" />
        </svg>
      </div>
    </div>
  );
}
