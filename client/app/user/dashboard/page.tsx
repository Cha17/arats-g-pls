"use client";

import { useEffect, useState } from "react";
import { UserWrapper } from "../../../components/AuthWrapper";
import { useAuth } from "../../../hooks/useAuth";
import Background from "@/components/ui/background";
import Header from "@/components/ui/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchUserRegistrations, cancelRegistration } from "@/src/lib/events";
import { EventCarousel } from "@/components/events/EventCarousel";
import { format } from "date-fns";
import { Calendar, MapPin, User, Clock, X } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import {
  DashboardStatsSkeleton,
  RegistrationCardSkeleton,
  EventCarouselSkeleton,
} from "@/components/ui/skeleton";

export default function UserDashboard() {
  return (
    <UserWrapper>
      <UserDashboardContent />
    </UserWrapper>
  );
}

function UserDashboardContent() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserRegistrations();
    }
  }, [user]);

  const loadUserRegistrations = async () => {
    try {
      const userRegistrations = await fetchUserRegistrations(user!.id);
      setRegistrations(userRegistrations);
    } catch (error) {
      console.error("Failed to load user registrations:", error);
      toast.error("Failed to load your registrations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRegistration = async (eventId: string) => {
    try {
      await cancelRegistration(eventId, user!.id);
      toast.success("Registration cancelled successfully");
      loadUserRegistrations(); // Refresh the list
    } catch (error) {
      toast.error("Failed to cancel registration");
    }
  };

  const handleEventRegister = () => {
    // Refresh registrations after registration
    loadUserRegistrations();
  };

  const upcomingEvents = registrations.filter(
    (reg) => new Date(reg.date) > new Date()
  );
  const pastEvents = registrations.filter(
    (reg) => new Date(reg.date) <= new Date()
  );

  return (
    <>
      <Background />
      <Header />

      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.firstName || user?.email}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your event registrations and stay updated with upcoming
              events.
            </p>
          </div>

          {/* Featured Events Carousel */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Discover New Events
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Explore and register for exciting research events and
                conferences
              </p>
            </div>

            {isLoading ? (
              <EventCarouselSkeleton />
            ) : (
              <EventCarousel onRegister={handleEventRegister} />
            )}

            <div className="mt-8 text-center">
              <Link href="/events">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Browse All Events
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          {isLoading ? (
            <DashboardStatsSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Registrations
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {registrations.length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Events
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {upcomingEvents.length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Past Events
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pastEvents.length}</div>
                </CardContent>
              </Card>
            </div>
          )}

          {isLoading ? (
            <div className="space-y-8">
              {/* Upcoming Events Skeleton */}
              <div>
                <div className="h-8 w-64 bg-gray-200 rounded mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <RegistrationCardSkeleton key={i} />
                  ))}
                </div>
              </div>

              {/* Past Events Skeleton */}
              <div>
                <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2].map((i) => (
                    <RegistrationCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Your Upcoming Events
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((registration) => (
                      <Card
                        key={registration.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">
                                {registration.title}
                              </CardTitle>
                              <CardDescription className="mt-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <User className="h-4 w-4" />
                                  {registration.author_name}
                                </div>
                              </CardDescription>
                            </div>
                            <Badge
                              variant={
                                registration.is_paid ? "default" : "secondary"
                              }
                            >
                              {registration.is_paid ? "Paid" : "Free"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              {format(
                                new Date(registration.date),
                                "MMM dd, yyyy - h:mm a"
                              )}
                            </div>
                            {registration.location && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                {registration.location}
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="h-4 w-4" />
                              Registered on{" "}
                              {format(
                                new Date(registration.registration_date),
                                "MMM dd, yyyy"
                              )}
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleCancelRegistration(registration.event_id)
                              }
                              className="w-full"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel Registration
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Past Events
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.map((registration) => (
                      <Card key={registration.id} className="opacity-75">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">
                                {registration.title}
                              </CardTitle>
                              <CardDescription className="mt-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <User className="h-4 w-4" />
                                  {registration.author_name}
                                </div>
                              </CardDescription>
                            </div>
                            <Badge variant="secondary">Completed</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              {format(
                                new Date(registration.date),
                                "MMM dd, yyyy - h:mm a"
                              )}
                            </div>
                            {registration.location && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                {registration.location}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* No Events */}
              {registrations.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No event registrations yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Start exploring events and register for exciting research
                    conferences and workshops.
                  </p>
                  <Link href="/events">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Browse Events
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
