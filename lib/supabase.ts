import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export type Profile = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  subscription_tier: 'free' | 'pro' | 'enterprise'
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: 'active' | 'inactive' | 'cancelled' | 'past_due'
  trial_ends_at: string | null
  created_at: string
  updated_at: string
}

export type TradingBot = {
  id: string
  user_id: string
  name: string
  status: 'running' | 'stopped' | 'paused' | 'error'
  strategy: 'ultra_aggressive' | 'liquidity_sweep' | 'pairs_trading' | 'mtf_confluence' | 'custom'
  symbol: string
  timeframe: string
  risk_per_trade: number
  max_daily_loss: number
  position_sizing_method: 'fixed' | 'kelly' | 'martingale'
  use_kelly_criterion: boolean
  kelly_fraction: number
  max_concurrent_trades: number
  enable_telegram_alerts: boolean
  enable_pyramiding: boolean
  enable_multi_timeframe: boolean
  total_trades: number
  winning_trades: number
  losing_trades: number
  total_profit: number
  largest_win: number
  largest_loss: number
  last_active_at: string | null
  created_at: string
  updated_at: string
}

export type Trade = {
  id: string
  bot_id: string
  user_id: string
  symbol: string
  direction: 'BUY' | 'SELL'
  entry_price: number
  exit_price: number | null
  lot_size: number
  stop_loss: number
  take_profit: number
  trailing_stop: boolean
  status: 'open' | 'closed' | 'cancelled'
  close_reason: 'take_profit' | 'stop_loss' | 'manual' | 'timeout' | 'error' | null
  profit_loss: number | null
  pips: number | null
  commission: number
  swap: number
  strategy: string | null
  signal_confidence: number | null
  entry_reason: string | null
  opened_at: string
  closed_at: string | null
  duration_seconds: number | null
  created_at: string
}

export type DailyPerformance = {
  id: string
  user_id: string
  bot_id: string | null
  date: string
  trades_count: number
  winning_trades: number
  losing_trades: number
  win_rate: number | null
  total_profit: number
  total_loss: number
  net_profit: number
  max_drawdown: number | null
  sharpe_ratio: number | null
  profit_factor: number | null
  created_at: string
}

// API functions
export const api = {
  // Profile
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data as Profile
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data as Profile
  },

  // Trading Bots
  async getBots(userId: string) {
    const { data, error } = await supabase
      .from('trading_bots')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as TradingBot[]
  },

  async getBot(botId: string) {
    const { data, error } = await supabase
      .from('trading_bots')
      .select('*')
      .eq('id', botId)
      .single()

    if (error) throw error
    return data as TradingBot
  },

  async createBot(bot: Partial<TradingBot>) {
    const { data, error } = await supabase
      .from('trading_bots')
      .insert(bot)
      .select()
      .single()

    if (error) throw error
    return data as TradingBot
  },

  async updateBot(botId: string, updates: Partial<TradingBot>) {
    const { data, error } = await supabase
      .from('trading_bots')
      .update(updates)
      .eq('id', botId)
      .select()
      .single()

    if (error) throw error
    return data as TradingBot
  },

  async deleteBot(botId: string) {
    const { error } = await supabase
      .from('trading_bots')
      .delete()
      .eq('id', botId)

    if (error) throw error
  },

  // Trades
  async getTrades(userId: string, limit: number = 50) {
    const { data, error } = await supabase
      .from('trades')
      .select('*')
      .eq('user_id', userId)
      .order('opened_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as Trade[]
  },

  async getBotTrades(botId: string, limit: number = 50) {
    const { data, error } = await supabase
      .from('trades')
      .select('*')
      .eq('bot_id', botId)
      .order('opened_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as Trade[]
  },

  async getOpenTrades(userId: string) {
    const { data, error } = await supabase
      .from('trades')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'open')
      .order('opened_at', { ascending: false })

    if (error) throw error
    return data as Trade[]
  },

  // Performance
  async getDailyPerformance(userId: string, days: number = 30) {
    const { data, error } = await supabase
      .from('daily_performance')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(days)

    if (error) throw error
    return data as DailyPerformance[]
  },

  // Subscribe to real-time updates
  subscribeToTrades(userId: string, callback: (trade: Trade) => void) {
    return supabase
      .channel('trades')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trades',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as Trade)
        }
      )
      .subscribe()
  },

  subscribeToBotStatus(userId: string, callback: (bot: TradingBot) => void) {
    return supabase
      .channel('trading_bots')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'trading_bots',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as TradingBot)
        }
      )
      .subscribe()
  },
}
