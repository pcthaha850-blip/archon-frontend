'use client'

import { useState, useEffect } from 'react'
import { Activity, TrendingUp, TrendingDown, DollarSign, BarChart3, Bot, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Mock data - replace with real API calls
const mockData = {
  bots: [
    {
      id: '1',
      name: 'ULTRA Aggressive EUR/USD',
      status: 'running',
      strategy: 'ultra_aggressive',
      symbol: 'EURUSD',
      profit: 2847.32,
      trades: 127,
      winRate: 68.5,
      lastSignal: '2 min ago',
    },
    {
      id: '2',
      name: 'Liquidity Sweep GBP/USD',
      status: 'running',
      strategy: 'liquidity_sweep',
      symbol: 'GBPUSD',
      profit: 1543.87,
      trades: 84,
      winRate: 72.3,
      lastSignal: '5 min ago',
    },
  ],
  recentTrades: [
    {
      id: '1',
      symbol: 'EURUSD',
      direction: 'BUY',
      entry: 1.08453,
      exit: 1.08653,
      profit: 156.32,
      pips: 20,
      time: '14:23:15',
    },
    {
      id: '2',
      symbol: 'GBPUSD',
      direction: 'SELL',
      entry: 1.27832,
      exit: 1.27632,
      profit: 143.87,
      pips: 20,
      time: '14:15:42',
    },
    {
      id: '3',
      symbol: 'EURUSD',
      direction: 'SELL',
      entry: 1.08721,
      exit: 1.08821,
      profit: -76.54,
      pips: -10,
      time: '13:58:33',
    },
  ],
  performance: {
    totalProfit: 4391.19,
    todayProfit: 532.45,
    totalTrades: 211,
    winningTrades: 147,
    losingTrades: 64,
    winRate: 69.7,
    profitFactor: 2.43,
    sharpeRatio: 1.87,
    maxDrawdown: -342.15,
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState(mockData.performance)
  const [bots, setBots] = useState(mockData.bots)
  const [trades, setTrades] = useState(mockData.recentTrades)
  const [loading, setLoading] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        todayProfit: prev.todayProfit + (Math.random() - 0.5) * 10,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trading Dashboard</h1>
          <p className="text-muted-foreground">Real-time performance and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Activity className="mr-2 h-4 w-4" />
            Real-time: ON
          </Button>
          <Button size="sm" className="bg-profit hover:bg-profit/90">
            Deploy New Bot
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total P&L"
          value={`$${stats.totalProfit.toFixed(2)}`}
          change={`+${stats.todayProfit.toFixed(2)} today`}
          icon={<DollarSign className="h-4 w-4" />}
          positive={stats.todayProfit > 0}
        />
        <MetricCard
          title="Win Rate"
          value={`${stats.winRate.toFixed(1)}%`}
          change={`${stats.winningTrades}W / ${stats.losingTrades}L`}
          icon={<TrendingUp className="h-4 w-4" />}
          positive={stats.winRate > 50}
        />
        <MetricCard
          title="Profit Factor"
          value={stats.profitFactor.toFixed(2)}
          change={`Sharpe: ${stats.sharpeRatio.toFixed(2)}`}
          icon={<BarChart3 className="h-4 w-4" />}
          positive={stats.profitFactor > 1}
        />
        <MetricCard
          title="Max Drawdown"
          value={`$${Math.abs(stats.maxDrawdown).toFixed(2)}`}
          change={`${(Math.abs(stats.maxDrawdown) / stats.totalProfit * 100).toFixed(1)}% of profit`}
          icon={<TrendingDown className="h-4 w-4" />}
          positive={false}
        />
      </div>

      {/* Active Bots */}
      <Card className="border-border">
        <CardHeader className="border-b border-border bg-secondary/30">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Active Trading Bots
          </CardTitle>
          <CardDescription>Manage your automated trading strategies</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="finviz-table">
              <thead>
                <tr>
                  <th>Bot Name</th>
                  <th>Status</th>
                  <th>Strategy</th>
                  <th>Symbol</th>
                  <th className="text-right">Profit</th>
                  <th className="text-right">Trades</th>
                  <th className="text-right">Win Rate</th>
                  <th>Last Signal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bots.map((bot) => (
                  <tr key={bot.id}>
                    <td className="font-semibold">{bot.name}</td>
                    <td>
                      <Badge className={`status-badge status-${bot.status}`}>
                        {bot.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="text-muted-foreground">{bot.strategy}</td>
                    <td className="font-mono font-semibold">{bot.symbol}</td>
                    <td className={`text-right font-mono font-bold ${bot.profit > 0 ? 'profit' : 'loss'}`}>
                      ${bot.profit.toFixed(2)}
                    </td>
                    <td className="text-right">{bot.trades}</td>
                    <td className={`text-right font-mono ${bot.winRate > 60 ? 'profit' : bot.winRate > 50 ? 'neutral' : 'loss'}`}>
                      {bot.winRate.toFixed(1)}%
                    </td>
                    <td className="text-muted-foreground text-xs">{bot.lastSignal}</td>
                    <td>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-loss hover:text-loss">
                          Stop
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card className="border-border">
        <CardHeader className="border-b border-border bg-secondary/30">
          <CardTitle>Recent Trades</CardTitle>
          <CardDescription>Latest executed trades across all bots</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="finviz-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Symbol</th>
                  <th>Direction</th>
                  <th className="text-right">Entry</th>
                  <th className="text-right">Exit</th>
                  <th className="text-right">Pips</th>
                  <th className="text-right">Profit</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr key={trade.id} className={trade.profit > 0 ? 'hover:bg-profit/5' : 'hover:bg-loss/5'}>
                    <td className="text-muted-foreground text-xs font-mono">{trade.time}</td>
                    <td className="font-mono font-semibold">{trade.symbol}</td>
                    <td>
                      <Badge className={`status-badge ${trade.direction === 'BUY' ? 'status-running' : 'border-loss/30 bg-loss/10 text-loss'}`}>
                        {trade.direction}
                      </Badge>
                    </td>
                    <td className="text-right font-mono">{trade.entry.toFixed(5)}</td>
                    <td className="text-right font-mono">{trade.exit.toFixed(5)}</td>
                    <td className={`text-right font-mono font-bold ${trade.pips > 0 ? 'profit' : 'loss'}`}>
                      {trade.pips > 0 ? '+' : ''}{trade.pips}
                    </td>
                    <td className={`text-right font-mono font-bold ${trade.profit > 0 ? 'profit' : 'loss'}`}>
                      ${trade.profit.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card className="border-border border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-profit animate-pulse" />
              <span className="text-muted-foreground">All systems operational</span>
            </div>
            <span className="text-xs text-muted-foreground">Last update: Just now</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({ title, value, change, icon, positive }: {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  positive: boolean
}) {
  return (
    <Card className="border-border metric-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="metric-card-title">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="metric-card-value">{value}</div>
        <p className={`metric-card-change ${positive ? 'profit' : 'loss'}`}>
          {change}
        </p>
      </CardContent>
    </Card>
  )
}
