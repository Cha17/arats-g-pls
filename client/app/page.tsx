import Link from "next/link";
import Background from "@/components/ui/background";
import Header from "@/components/ui/header";
import { EventCarousel } from "@/components/events/EventCarousel";
import { AuthButtons } from "@/components/auth/auth-buttons";

export default function Home() {
  return (
    <>
      <Background />
      <Header />
      <main className="pt-28 pb-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-3xl font-bold tracking-tighter mb-2">
              Welcome to Arats G!
            </h1>
            <p className="text-base text-gray-700">
              Discover and join events with our event management system.
            </p>
          </div>
          <section>
            <EventCarousel />
          </section>
        </div>
      </main>
    </>
  );
}
