import { LoaderIcon, MessageCircle, Users } from "lucide-react";

function ChatLoader() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 animate-pulse"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-bounce delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-bounce delay-500"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Main Loading Animation */}
        <div className="relative mb-8">
          <div className="relative">
            <MessageCircle className="size-16 text-primary animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-ping"></div>
          </div>
          <div className="absolute -top-2 -right-2">
            <Users className="size-8 text-secondary animate-bounce" />
          </div>
        </div>
        
        {/* Loading Spinner */}
        <div className="relative mb-6">
          <LoaderIcon className="animate-spin size-12 text-primary" />
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg"></div>
        </div>
        
        {/* Loading Text with Animation */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
            Connecting to Chat
          </h3>
          <p className="text-base opacity-70 animate-fade-in">
            Setting up your conversation...
          </p>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLoader;