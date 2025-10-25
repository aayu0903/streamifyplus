import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { 
  CheckCircleIcon, 
  MapPinIcon, 
  UserPlusIcon, 
  UsersIcon, 
  MessageCircle, 
  Trophy, 
  Target, 
  Globe, 
  Sparkles,
  TrendingUp,
  Clock,
  Heart
} from "lucide-react";

import { capitialize } from "../lib/utils";
import useAuthUser from "../hooks/useAuthUser";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const { authUser } = useAuthUser();

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/3 to-accent/5 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-primary/3 to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary/5 rounded-full blur-xl animate-bounce delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent/5 rounded-full blur-xl animate-bounce delay-500"></div>
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto space-y-12">
          
          {/* Hero Section */}
          <div className="text-center py-8 lg:py-12">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4 animate-gradient">
                Welcome back, {authUser?.fullName?.split(' ')[0]}! 👋
              </h1>
              <p className="text-lg lg:text-xl opacity-70 max-w-2xl mx-auto mb-8">
                Ready to continue your language learning journey? Connect with friends and discover new partners!
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-base-100/80 backdrop-blur-sm rounded-xl p-4 border border-primary/10 hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <UsersIcon className="size-5 text-primary" />
                    <span className="font-semibold text-primary">{friends.length}</span>
                  </div>
                  <p className="text-sm opacity-70">Friends</p>
                </div>
                <div className="bg-base-100/80 backdrop-blur-sm rounded-xl p-4 border border-secondary/10 hover:border-secondary/20 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MessageCircle className="size-5 text-secondary" />
                    <span className="font-semibold text-secondary">0</span>
                  </div>
                  <p className="text-sm opacity-70">Conversations</p>
                </div>
                <div className="bg-base-100/80 backdrop-blur-sm rounded-xl p-4 border border-accent/10 hover:border-accent/20 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="size-5 text-accent" />
                    <span className="font-semibold text-accent">0</span>
                  </div>
                  <p className="text-sm opacity-70">Achievements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Friends Section */}
          <section className="animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Your Friends
                </h2>
                <p className="text-base opacity-70 mt-2">
                  Connect and practice with your language partners
                </p>
              </div>
              <Link to="/notifications" className="btn btn-primary btn-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <UsersIcon className="mr-2 size-4" />
                Friend Requests
              </Link>
            </div>

            {loadingFriends ? (
              <div className="flex justify-center py-12">
                <div className="relative">
                  <span className="loading loading-spinner loading-lg text-primary" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
                </div>
              </div>
            ) : friends.length === 0 ? (
              <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-primary/10 shadow-lg">
                <div className="relative mb-6">
                  <UsersIcon className="size-16 text-primary mx-auto opacity-50" />
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  No friends yet
                </h3>
                <p className="text-base opacity-70 mb-6">
                  Connect with language partners below to start practicing together!
                </p>
                <div className="flex justify-center">
                  <Sparkles className="size-6 text-primary animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {friends.map((friend, index) => (
                  <div 
                    key={friend._id} 
                    className="transform hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <FriendCard friend={friend} />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recommendations Section */}
          <section className="animate-fade-in">
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    Meet New Learners
                  </h2>
                  <p className="text-base opacity-70 mt-2">
                    Discover perfect language exchange partners based on your profile
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-60">
                  <Globe className="size-4" />
                  <span>Worldwide community</span>
                </div>
              </div>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-12">
                <div className="relative">
                  <span className="loading loading-spinner loading-lg text-secondary" />
                  <div className="absolute inset-0 bg-secondary/20 rounded-full blur-md"></div>
                </div>
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-secondary/10 shadow-lg">
                <div className="relative mb-6">
                  <Target className="size-16 text-secondary mx-auto opacity-50" />
                  <div className="absolute inset-0 bg-secondary/10 rounded-full blur-xl"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  No recommendations available
                </h3>
                <p className="text-base opacity-70 mb-6">
                  Check back later for new language partners!
                </p>
                <div className="flex justify-center">
                  <Clock className="size-6 text-secondary animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedUsers.map((user, index) => {
                  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                  return (
                    <div
                      key={user._id}
                      className="bg-base-100/80 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="avatar size-16 rounded-full ring-2 ring-primary/20">
                              <img src={user.profilePic} alt={user.fullName} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-base-100"></div>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{user.fullName}</h3>
                            {user.location && (
                              <div className="flex items-center text-xs opacity-70 mt-1">
                                <MapPinIcon className="size-3 mr-1" />
                                {user.location}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Languages with flags */}
                        <div className="flex flex-wrap gap-2">
                          <span className="badge badge-primary gap-1">
                            {getLanguageFlag(user.nativeLanguage)}
                            Native: {capitialize(user.nativeLanguage)}
                          </span>
                          <span className="badge badge-outline gap-1">
                            {getLanguageFlag(user.learningLanguage)}
                            Learning: {capitialize(user.learningLanguage)}
                          </span>
                        </div>

                        {user.bio && (
                          <p className="text-sm opacity-70 leading-relaxed">
                            {user.bio}
                          </p>
                        )}

                        {/* Action button */}
                        <button
                          className={`btn w-full mt-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                            hasRequestBeenSent 
                              ? "btn-disabled bg-green-100 text-green-700" 
                              : "btn-primary bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                          }`}
                          onClick={() => sendRequestMutation(user._id)}
                          disabled={hasRequestBeenSent || isPending}
                        >
                          {hasRequestBeenSent ? (
                            <>
                              <CheckCircleIcon className="size-4 mr-2" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="size-4 mr-2" />
                              Send Friend Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;