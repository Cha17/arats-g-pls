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
          <div className="flex flex-col items-center justify-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter mb-4">
              Welcome to ARATS-G Events
            </h1>
            <div className="flex items-center justify-center gap-4">
              <AuthButtons />
            </div>
          </div>

          <section>
            <EventCarousel />
          </section>

          <div className="flex mt-10 items-center flex-col justify-center gap-4">
            <Link
              href="/events"
              className="text-lg font-medium hover:underline"
            >
              View All Events
            </Link>
            <Link href="/about" className="text-lg font-medium hover:underline">
              About ARATS-G
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
