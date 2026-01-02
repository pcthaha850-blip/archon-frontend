import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value)
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`
}

export function formatPips(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}`
}

export function formatPrice(value: number, decimals: number = 5): string {
  return value.toFixed(decimals)
}

export function calculateWinRate(wins: number, losses: number): number {
  const total = wins + losses
  return total === 0 ? 0 : (wins / total) * 100
}

export function calculateProfitFactor(grossProfit: number, grossLoss: number): number {
  return grossLoss === 0 ? 0 : grossProfit / Math.abs(grossLoss)
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'running':
    case 'active':
      return 'profit'
    case 'stopped':
    case 'inactive':
      return 'neutral'
    case 'error':
    case 'failed':
      return 'loss'
    default:
      return 'neutral'
  }
}

export function getProfitClass(value: number): string {
  if (value > 0) return 'profit'
  if (value < 0) return 'loss'
  return 'neutral'
}
