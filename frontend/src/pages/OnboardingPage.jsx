import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { 
  LoaderIcon, 
  MapPinIcon, 
  ShipWheelIcon, 
  ShuffleIcon, 
  CameraIcon,
  User,
  MessageSquare,
  Globe,
  CheckCircle,
  Sparkles,
  Heart,
  Target
} from "lucide-react";
import { LANGUAGES, LANGUAGE_TO_FLAG } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  // Progress calculation
  const getProgress = () => {
    let progress = 0;
    if (formState.fullName) progress += 20;
    if (formState.bio) progress += 20;
    if (formState.nativeLanguage) progress += 20;
    if (formState.learningLanguage) progress += 20;
    if (formState.location) progress += 20;
    return progress;
  };

  const progress = getProgress();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-primary/5 to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary/5 rounded-full blur-xl animate-bounce delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent/5 rounded-full blur-xl animate-bounce delay-500"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          
          {/* Hero Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="relative mb-6">
              <ShipWheelIcon className="size-16 text-primary mx-auto animate-spin-slow" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4 animate-gradient">
              Welcome to Streamify! 🎉
            </h1>
            <p className="text-lg lg:text-xl opacity-70 max-w-2xl mx-auto mb-8">
              Let's set up your profile to connect with amazing language partners around the world
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-primary font-medium">Profile Progress</span>
                <span className="text-secondary font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-base-100/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-primary/10 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* PROFILE PIC CONTAINER */}
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                      Choose Your Avatar
                    </h2>
                    <p className="text-sm opacity-70">Let others see who you are</p>
                  </div>
                  
                  {/* IMAGE PREVIEW */}
                  <div className="relative">
                    <div className="size-40 rounded-full bg-base-200 overflow-hidden ring-4 ring-primary/20 hover:ring-primary/40 transition-all duration-300 shadow-lg">
                      {formState.profilePic ? (
                        <img
                          src={formState.profilePic}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-secondary/10">
                          <CameraIcon className="size-16 text-primary opacity-50" />
                        </div>
                      )}
                    </div>
                    {formState.profilePic && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-base-100">
                        <CheckCircle className="size-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Generate Random Avatar BTN */}
                  <button 
                    type="button" 
                    onClick={handleRandomAvatar} 
                    className="btn btn-primary bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <ShuffleIcon className="size-4 mr-2" />
                    Generate Random Avatar
                  </button>
                </div>

                {/* FULL NAME */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <User className="size-4" />
                      Full Name
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      className="input w-full pl-12 bg-base-200/50 border border-primary/20 focus:border-primary focus:bg-base-100 transition-all duration-300 hover:border-primary/40 rounded-lg"
                      placeholder="Your full name"
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 size-4 text-primary/60" />
                  </div>
                </div>

                {/* BIO */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <MessageSquare className="size-4" />
                      Bio
                    </span>
                  </label>
                  <textarea
                    name="bio"
                    value={formState.bio}
                    onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                    className="textarea w-full bg-base-200/50 border border-primary/20 focus:border-primary focus:bg-base-100 transition-all duration-300 hover:border-primary/40 rounded-lg h-24"
                    placeholder="Tell others about yourself and your language learning goals..."
                  />
                </div>

                {/* LANGUAGES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* NATIVE LANGUAGE */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <Heart className="size-4" />
                        Native Language
                      </span>
                    </label>
                    <select
                      name="nativeLanguage"
                      value={formState.nativeLanguage}
                      onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                      className="select w-full bg-base-200/50 border border-primary/20 focus:border-primary focus:bg-base-100 transition-all duration-300 hover:border-primary/40 rounded-lg"
                    >
                      <option value="">Select your native language</option>
                      {LANGUAGES.map((lang) => {
                        const flag = LANGUAGE_TO_FLAG[lang.toLowerCase()];
                        return (
                          <option key={`native-${lang}`} value={lang.toLowerCase()}>
                            {flag && <img src={`https://flagcdn.com/16x12/${flag}.png`} alt="" className="inline mr-2" />}
                            {lang}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* LEARNING LANGUAGE */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <Target className="size-4" />
                        Learning Language
                      </span>
                    </label>
                    <select
                      name="learningLanguage"
                      value={formState.learningLanguage}
                      onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                      className="select w-full bg-base-200/50 border border-primary/20 focus:border-primary focus:bg-base-100 transition-all duration-300 hover:border-primary/40 rounded-lg"
                    >
                      <option value="">Select language you're learning</option>
                      {LANGUAGES.map((lang) => {
                        const flag = LANGUAGE_TO_FLAG[lang.toLowerCase()];
                        return (
                          <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                            {flag && <img src={`https://flagcdn.com/16x12/${flag}.png`} alt="" className="inline mr-2" />}
                            {lang}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* LOCATION */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <Globe className="size-4" />
                      Location
                    </span>
                  </label>
                  <div className="relative">
                    <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-4 size-4 text-primary/60" />
                    <input
                      type="text"
                      name="location"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      className="input w-full pl-12 bg-base-200/50 border border-primary/20 focus:border-primary focus:bg-base-100 transition-all duration-300 hover:border-primary/40 rounded-lg"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-4">
                  <button 
                    className="btn btn-primary w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                    disabled={isPending || progress < 100} 
                    type="submit"
                  >
                    {!isPending ? (
                      <>
                        <ShipWheelIcon className="size-5 mr-2" />
                        Complete Onboarding
                        <Sparkles className="size-5 ml-2" />
                      </>
                    ) : (
                      <>
                        <LoaderIcon className="animate-spin size-5 mr-2" />
                        Setting up your profile...
                      </>
                    )}
                  </button>
                  
                  {progress < 100 && (
                    <p className="text-center text-sm opacity-60 mt-3">
                      Complete all fields to continue
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OnboardingPage;
