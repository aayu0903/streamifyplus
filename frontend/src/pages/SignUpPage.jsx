import { useState } from "react";
import { ShipWheelIcon, Eye, EyeOff, Mail, Lock, User, CheckCircle } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";


const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const {isPending,error,signupMutation} = useSignUp()

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: 0, label: "Too short" };
    if (password.length < 8) return { strength: 1, label: "Weak" };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 3, label: "Strong" };
    }
    if (password.length >= 8) return { strength: 2, label: "Good" };
    return { strength: 0, label: "Too short" };
  };

  const passwordStrength = getPasswordStrength(signupData.password);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
      data-theme="forest"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/20 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-secondary/5 to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-bounce delay-1000"></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-bounce delay-500"></div>
      
      <div className="relative z-10 border border-primary/25 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-base-100/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center min-h-[600px] lg:min-h-auto">
          {/* LOGO */}
          <div className="mb-6 lg:mb-8 flex items-center justify-center lg:justify-start gap-3 animate-fade-in">
            <div className="relative">
              <ShipWheelIcon className="size-8 lg:size-10 text-primary animate-spin-slow" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
            </div>
            <span className="text-3xl lg:text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent tracking-wider animate-gradient">
              Streamify
            </span>
          </div>

          {error && (
            <div className="alert alert-error mb-6 animate-shake">
              <span>{error.response.data.message}</span>
            </div>
          )}


          
          <div className="w-full">
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="text-center mb-6 lg:mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  Create an Account
                </h2>
                <p className="text-sm lg:text-base opacity-70">
                  Join Streamify and start your language learning adventure!
                </p>
              </div>

              <div className="space-y-6">
                {/* FULLNAME */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <User className="size-4" />
                      Full Name
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input w-full pl-12 bg-base-200/50 border border-primary/20 focus:border-primary focus:bg-base-100 transition-all duration-300 hover:border-primary/40 rounded-lg"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 size-4 text-primary/60" />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <Mail className="size-4" />
                      Email Address
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="john@gmail.com"
                      className="input w-full pl-12 bg-base-200/50 border border-primary/20 focus:border-primary focus:bg-base-100 transition-all duration-300 hover:border-primary/40 rounded-lg"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 size-4 text-primary/60" />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <Lock className="size-4" />
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="input w-full pl-12 pr-12 bg-base-200/50 border border-primary/20 focus:border-primary focus:bg-base-100 transition-all duration-300 hover:border-primary/40 rounded-lg"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 size-4 text-primary/60" />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary/60 hover:text-primary transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {signupData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 h-2 bg-base-300 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              passwordStrength.strength === 0 ? 'bg-error' :
                              passwordStrength.strength === 1 ? 'bg-warning' :
                              passwordStrength.strength === 2 ? 'bg-info' : 'bg-success'
                            }`}
                            style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-medium ${
                          passwordStrength.strength === 0 ? 'text-error' :
                          passwordStrength.strength === 1 ? 'text-warning' :
                          passwordStrength.strength === 2 ? 'text-info' : 'text-success'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="text-xs opacity-70">
                        Password must be at least 6 characters long
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input type="checkbox" className="checkbox checkbox-sm" required />
                    <span className="text-xs leading-tight">
                      I agree to the{" "}
                      <span className="text-primary hover:underline">terms of service</span> and{" "}
                      <span className="text-primary hover:underline">privacy policy</span>
                    </span>
                  </label>
                </div>

                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? "Signing up..." : "Create Account"}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">DEVELOPED BY AAYUSH TIWARI</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;