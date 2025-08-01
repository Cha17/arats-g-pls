"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { fetchEvents } from "@/src/lib/events";
import { Event } from "@/src/lib/events";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import Background from "@/components/ui/background";
import Header from "@/components/ui/header";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
        setFilteredEvents(eventsData);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.author_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by author
    if (selectedAuthor) {
      filtered = filtered.filter(
        (event) => event.author_name === selectedAuthor
      );
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedAuthor]);

  const authors = [...new Set(events.map((event) => event.author_name))];

  const handleRegister = () => {
    // Refresh events after registration
    window.location.reload();
  };

  if (isLoading) {
    return (
      <>
        <Background />
        <Header />
        <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Background />
      <Header />

      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Events
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Discover and register for exciting research events and conferences
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search events by title, description, location, or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="sm:w-48">
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                  <option value="">All Authors</option>
                  {authors.map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredEvents.length} of {events.length} events
              </p>
              {(searchTerm || selectedAuthor) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedAuthor("");
                  }}
                  className="text-sm"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400">
                <Search className="mx-auto h-12 w-12 mb-4" />
                <h3 className="text-lg font-medium mb-2">No events found</h3>
                <p>
                  {searchTerm || selectedAuthor
                    ? "Try adjusting your search criteria or filters."
                    : "No events are currently available. Check back soon!"}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={handleRegister}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
