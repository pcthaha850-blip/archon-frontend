'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Bot,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Activity,
  Target,
  Lock,
  Cpu
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary">
              <Cpu className="h-6 w-6 text-black" />
            </div>
            <div>
              <div className="text-sm font-bold leading-tight">ARCHON CODE</div>
              <div className="text-[10px] text-muted-foreground">by The Archon Research Institutes</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#performance" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Performance
            </Link>
            <Link href="#docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-profit hover:bg-profit/90 text-black">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
        <Badge className="status-badge status-running mb-2">
          <Activity className="mr-1 h-3 w-3" />
          Live Trading Enabled
        </Badge>

        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          ARCHON CODE
          <span className="block text-primary mt-2">AI Trading Software</span>
        </h1>

        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl mt-4">
          Professional algorithmic trading platform powered by advanced AI strategies.
          <span className="block mt-2 text-sm">
            by The Archon Research Institutes
          </span>
        </p>

        <div className="flex flex-col gap-4 min-[400px]:flex-row mt-8">
          <Button size="lg" className="bg-profit hover:bg-profit/90 text-black px-8">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline">
            <BarChart3 className="mr-2 h-5 w-5" />
            View Live Performance
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold profit">$24.8K+</div>
            <div className="text-sm text-muted-foreground mt-1">Avg. Monthly Profit</div>
          </div>
          <div>
            <div className="text-3xl font-bold profit">71.3%</div>
            <div className="text-sm text-muted-foreground mt-1">Win Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground mt-1">Automated Trading</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container py-16 md:py-24 border-t border-border">
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Advanced Trading Features
          </h2>
          <p className="max-w-[700px] text-muted-foreground">
            Built with institutional-grade strategies and risk management
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Bot className="h-10 w-10 text-primary" />}
            title="8 AI Strategies"
            description="Liquidity Sweep, Pairs Trading, Multi-Timeframe Confluence, and more advanced algorithms"
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-profit" />}
            title="Kelly Criterion"
            description="Optimal position sizing based on historical win rate and risk/reward ratio"
          />
          <FeatureCard
            icon={<TrendingUp className="h-10 w-10 text-profit" />}
            title="Smart Pyramiding"
            description="Intelligent trade layering to maximize profits while managing risk"
          />
          <FeatureCard
            icon={<Target className="h-10 w-10 text-primary" />}
            title="S/R Automation"
            description="Auto-detect support and resistance levels for precise entry and exit"
          />
          <FeatureCard
            icon={<BarChart3 className="h-10 w-10 text-primary" />}
            title="Real-time Analytics"
            description="Track performance, trades, and risk metrics with live dashboards"
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-profit" />}
            title="MT5 Integration"
            description="Direct connection to MetaTrader 5 for instant trade execution"
          />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container py-16 md:py-24 border-t border-border">
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-[700px] text-muted-foreground">
            Choose the plan that fits your trading goals
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <PricingCard
            name="Free"
            price="$0"
            period="forever"
            features={[
              "1 trading bot",
              "Basic strategies",
              "7-day history",
              "Email support",
              "Basic analytics"
            ]}
            cta="Start Free"
          />
          <PricingCard
            name="Pro"
            price="$29"
            period="per month"
            featured
            features={[
              "3 trading bots",
              "All 8 AI strategies",
              "90-day history",
              "Telegram alerts",
              "Advanced analytics",
              "Multi-timeframe analysis",
              "Priority support"
            ]}
            cta="Start Trial"
          />
          <PricingCard
            name="Enterprise"
            price="$99"
            period="per month"
            features={[
              "Unlimited bots",
              "Custom strategies",
              "Unlimited history",
              "API access",
              "Dedicated support",
              "White-label option",
              "Custom indicators"
            ]}
            cta="Contact Sales"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24 border-t border-border">
        <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="flex flex-col items-center gap-4 p-12 text-center">
            <Lock className="h-12 w-12 text-primary" />
            <h2 className="text-3xl font-bold">Ready to Start Trading?</h2>
            <p className="max-w-[600px] text-muted-foreground">
              Join hundreds of traders using ARCHON CODE to automate their forex trading
              with AI-powered strategies and advanced risk management.
            </p>
            <Button size="lg" className="bg-profit hover:bg-profit/90 text-black mt-4">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 mt-16">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="h-6 w-6 text-primary" />
                <span className="font-bold">ARCHON CODE</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI Trading Software by The Archon Research Institutes
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
                <li><Link href="#" className="hover:text-foreground">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-foreground">Risk Disclosure</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 The Archon Research Institutes. All rights reserved.</p>
            <p className="mt-2 text-xs">
              Trading forex carries a high level of risk and may not be suitable for all investors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="border-border">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function PricingCard({ name, price, period, features, cta, featured }: {
  name: string
  price: string
  period: string
  features: string[]
  cta: string
  featured?: boolean
}) {
  return (
    <Card className={`border-border ${featured ? 'border-primary border-2 relative' : ''}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-black">Most Popular</Badge>
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-lg">{name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-2">/{period}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-5 w-5 text-profit flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className={`w-full ${featured ? 'bg-primary hover:bg-primary/90' : ''}`}
          variant={featured ? 'default' : 'outline'}
        >
          {cta}
        </Button>
      </CardContent>
    </Card>
  )
}
