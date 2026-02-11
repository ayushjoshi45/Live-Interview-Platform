import { Link } from "react-router";
import Navbar from "../components/Navbar";
import {
  Code2Icon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";

function AboutPage() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <SparklesIcon className="size-6 text-primary" />
            </div>
            <span className="badge badge-primary badge-outline">About</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Built for real-time interview practice</h1>
          <p className="text-base-content/70 max-w-2xl">
            Prepzy brings video, chat, and code editing into one focused space so teams and
            candidates can collaborate with clarity.
          </p>
        </div>

        {/* HIGHLIGHTS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <VideoIcon className="size-6 text-primary" />
              </div>
              <h3 className="card-title">Video-first collaboration</h3>
              <p className="text-base-content/70">
                Clear, low-latency calls keep interviews natural and focused on problem solving.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="size-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                <Code2Icon className="size-6 text-secondary" />
              </div>
              <h3 className="card-title">Shared code editor</h3>
              <p className="text-base-content/70">
                Write, run, and iterate together with a synced editor and instant feedback.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="size-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                <UsersIcon className="size-6 text-accent" />
              </div>
              <h3 className="card-title">Structured sessions</h3>
              <p className="text-base-content/70">
                Host and participant roles keep sessions organized, even with complex problems.
              </p>
            </div>
          </div>
        </div>

        {/* STORY */}
        <div className="card bg-base-100 shadow-lg mb-12">
          <div className="card-body">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ZapIcon className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Why we built this</h2>
                <p className="text-base-content/70 leading-relaxed">
                  Interview practice should feel real. Prepzy focuses on the workflow that
                  matters most: a live problem, a shared editor, and a conversation that flows.
                  We keep the interface calm so your attention stays on solving.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* VALUES */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <ShieldCheckIcon className="size-6 text-success mb-2" />
              <h3 className="card-title">Reliable by design</h3>
              <p className="text-base-content/70">
                Sessions are built to stay stable under real interview pressure.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <SparklesIcon className="size-6 text-warning mb-2" />
              <h3 className="card-title">Delightful experience</h3>
              <p className="text-base-content/70">
                A focused UI with thoughtful touches makes practice feel effortless.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <ZapIcon className="size-6 text-error mb-2" />
              <h3 className="card-title">Fast feedback</h3>
              <p className="text-base-content/70">
                Run code instantly and iterate together without breaking the flow.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link to="/dashboard" className="btn btn-primary">
            Start a session
          </Link>
          <Link to="/problems" className="btn btn-outline">
            Explore problems
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;