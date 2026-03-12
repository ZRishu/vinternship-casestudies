export function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`
}

export function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}
