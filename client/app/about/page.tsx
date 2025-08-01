"use client";

import Background from "@/components/ui/background";
import Header from "@/components/ui/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Calendar, MapPin, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Background />
      <Header />

      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
              About ARATS-G
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced Research Analysis & Tracking System - Empowering
              researchers to connect, collaborate, and advance their work
              through innovative event management and community building.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-blue-600" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  To create a comprehensive platform that bridges the gap
                  between researchers, providing them with the tools and
                  opportunities to share knowledge, collaborate on projects, and
                  advance scientific discovery through meaningful events and
                  connections.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-blue-600" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  To become the leading platform for research community
                  engagement, fostering innovation through accessible event
                  management, seamless collaboration tools, and a vibrant
                  network of researchers across all disciplines and geographical
                  boundaries.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What We Offer */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Event Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Discover and register for research conferences, workshops,
                    seminars, and networking events tailored to your field of
                    interest.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Community Building
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect with fellow researchers, share insights, and build
                    professional relationships that advance your research goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Research Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Track your research progress, manage your event
                    participation, and stay organized with our comprehensive
                    research management tools.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Innovation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Continuously improving our platform to better serve the
                  research community.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Collaboration
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Fostering meaningful connections and partnerships among
                  researchers.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Accessibility
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Making research events and opportunities accessible to all
                  researchers.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Excellence
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Maintaining high standards in everything we do for the
                  research community.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Research Community
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Ready to connect with fellow researchers and discover exciting
              events? Start your journey with ARATS-G today and become part of a
              vibrant research community that's shaping the future of science
              and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/events"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Browse Events
              </a>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
