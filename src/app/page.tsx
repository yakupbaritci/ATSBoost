import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, FileText, Sparkles, Upload, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            ATSBoost.ai
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-primary">
              Login
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 md:pt-32">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm font-medium text-zinc-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              New: Supported by latest GPT-4o AI
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
              Optimize your CV <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                for parsing algorithms
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop getting rejected by robots. Our AI analyzes your resume against job descriptions and optimizes keywords to boost your ATS score instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="h-12 px-8 text-base">
                  Start Optimizing for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  View Demo
                </Button>
              </Link>
            </div>

            {/* Dashboard Mockup */}
            <div className="mt-20 relative mx-auto max-w-5xl rounded-xl border border-zinc-200 bg-zinc-50/50 p-2 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900/50 backdrop-blur-sm">
              <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 aspect-[16/9] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950 flex items-center justify-center text-zinc-400">
                  {/* Placeholder for App Screenshot */}
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="font-medium">Interactive Builder Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Why use ATSBoost?</h2>
              <p className="text-zinc-600 dark:text-zinc-400">We decode the black box of Applicant Tracking Systems so you can focus on the interview.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Upload className="h-6 w-6" />}
                title="Smart PDF Parsing"
                description="Our advanced parser extracts your details accurately, even from complex layouts, separating contact info from experience."
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="Real-time Optimization"
                description="Paste a job description and watch our AI rewrite your summary and skills to match keywords instantly."
              />
              <FeatureCard
                icon={<CheckCircle2 className="h-6 w-6" />}
                title="ATS Score Check"
                description="Get a score on how well your resume matches the job. Fix missing keywords before you apply."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-24 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for speed and precision</h2>
                <div className="space-y-8">
                  <Step
                    number="01"
                    title="Upload your PDF"
                    description="Drag and drop your existing resume. We'll extract the text while preserving the original file."
                  />
                  <Step
                    number="02"
                    title="Paste Job Description"
                    description="Tell us what job you are applying for. The more specific, the better the match."
                  />
                  <Step
                    number="03"
                    title="One-Click Optimize"
                    description="Our AI updates your content with relevant keywords and strong action verbs. Download and apply."
                  />
                </div>
              </div>
              <div className="relative">
                {/* Abstract Visual */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-[100px] opacity-20" />
                <div className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-8 shadow-xl">
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <hr className="border-zinc-200 dark:border-zinc-800" />
                    <div className="h-20 w-full bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-bold text-blue-600">AI Suggestion</span>
                      </div>
                      <div className="h-2 w-full bg-blue-200 dark:bg-blue-800/50 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          <p className="mb-4">© 2024 ATSBoost.ai. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">Privacy</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">Terms</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
    </div>
  )
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center font-bold text-lg text-zinc-400">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
