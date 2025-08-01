"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Event } from "@/src/lib/events";
import { useAuth } from "@/hooks/useAuth";
import { registerForEvent } from "@/src/lib/events";
import { toast } from "react-hot-toast";

interface EventCardProps {
  event: Event;
  onRegister?: () => void;
  showRegisterButton?: boolean;
}

export function EventCard({
  event,
  onRegister,
  showRegisterButton = true,
}: EventCardProps) {
  const { user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    if (!user) {
      toast.error("Please sign in to register for events");
      return;
    }

    setIsRegistering(true);
    try {
      await registerForEvent(event.id, user.id);
      toast.success("Successfully registered for event!");
      onRegister?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to register for event"
      );
    } finally {
      setIsRegistering(false);
    }
  };

  const isFree = event.price === "0" || event.price === "0.00";
  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4">
          {event.image_urls ? (
            <img
              src={event.image_urls}
              alt={event.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No image</span>
            </div>
          )}
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

      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">📅</span>
            <span>{format(eventDate, "MMM dd, yyyy - h:mm a")}</span>
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

      {showRegisterButton && (
        <CardFooter className="pt-0">
          <Button
            onClick={handleRegister}
            disabled={isRegistering || isPastEvent}
            className="w-full"
            variant={isPastEvent ? "secondary" : "default"}
          >
            {isRegistering
              ? "Registering..."
              : isPastEvent
              ? "Event Ended"
              : "Register Now"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
