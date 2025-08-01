"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Event, fetchFeaturedEvents, getImageUrl } from "@/src/lib/events";
import { useAuth } from "@/hooks/useAuth";
import { registerForEvent } from "@/src/lib/events";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { EventCarouselSkeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { LoginPromptDialog } from "@/components/auth/LoginPromptDialog";

interface EventCarouselProps {
  onRegister?: () => void;
}

export function EventCarousel({ onRegister }: EventCarouselProps) {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState<string | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const loadEvents = async () => {
    try {
      console.log("🔄 EventCarousel: Starting to load events...");
      setError(null);
      setIsLoading(true);

      console.log("🔄 EventCarousel: Calling fetchFeaturedEvents...");
      const eventsData = await fetchFeaturedEvents();
      console.log("✅ EventCarousel: Successfully loaded events:", eventsData);

      setEvents(eventsData);
    } catch (error) {
      console.error("❌ EventCarousel: Failed to load featured events:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load events"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("🚀 EventCarousel: Component mounted, loading events...");
    loadEvents();
  }, []);

  const handleRegister = async (eventId: string) => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    setIsRegistering(eventId);
    try {
      await registerForEvent(eventId, user.id);
      toast.success("Successfully registered for event!");
      onRegister?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to register for event"
      );
    } finally {
      setIsRegistering(null);
    }
  };

  if (isLoading) {
    return <EventCarouselSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Unable to Load Events
          </h3>
          <p className="text-gray-600 mb-4 max-w-md">{error}</p>
          <Button onClick={loadEvents} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-500 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No Featured Events
          </h3>
          <p className="text-gray-500">Check back soon for exciting events!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {events.map((event) => {
            const isFree = event.price === "0" || event.price === "0.00";
            const eventDate = new Date(event.date);
            const isPastEvent = eventDate < new Date();

            return (
              <CarouselItem
                key={event.id}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="">
                    <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4">
                      {(() => {
                        const imageUrl = getImageUrl(event.image_urls);
                        return imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={(e) => {
                              console.error("Image failed to load:", imageUrl);
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling?.classList.remove(
                                "hidden"
                              );
                            }}
                          />
                        ) : null;
                      })()}
                      <div
                        className={`w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center ${
                          event.image_urls ? "hidden" : ""
                        }`}
                      >
                        <span className="text-gray-500 text-sm">
                          {event.image_urls ? "Image unavailable" : "No image"}
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant={isFree ? "secondary" : "default"}>
                          {isFree ? "Free" : `₱${event.price}`}
                        </Badge>
                      </div>
                    </div>

                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {event.description || "No description available"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">📅</span>
                        <span>
                          {format(eventDate, "MMM dd, yyyy - h:mm a")}
                        </span>
                      </div>

                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-medium">📍</span>
                          <span>{event.location}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">👤</span>
                        <span>{event.author_name}</span>
                      </div>
                    </div>
                  </CardContent>

                  <div className="px-6">
                    <Button
                      onClick={() => handleRegister(event.id)}
                      disabled={isRegistering === event.id || isPastEvent}
                      className="w-full"
                      variant={isPastEvent ? "secondary" : "default"}
                    >
                      {isRegistering === event.id
                        ? "Registering..."
                        : isPastEvent
                        ? "Event Ended"
                        : "Register Now"}
                    </Button>
                  </div>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="hidden md:block">
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </div>
      </Carousel>

      <LoginPromptDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
      />
    </div>
  );
}
