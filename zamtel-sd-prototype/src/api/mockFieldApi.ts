const delay = (ms: number) => new Promise((r) => window.setTimeout(r, ms))

export interface FlushQueueResult {
  synced: number
  failed: number
  remaining: number
}

/**
 * Simulates bulk upload of queued visits. Occasionally leaves items pending (demo flake).
 */
export async function flushQueue(pendingCount: number): Promise<FlushQueueResult> {
  if (pendingCount <= 0) {
    return { synced: 0, failed: 0, remaining: 0 }
  }
  await delay(500 + Math.round(Math.random() * 400))

  // ~12% chance one item fails to sync (retry later)
  if (pendingCount > 1 && Math.random() < 0.12) {
    const synced = pendingCount - 1
    return { synced, failed: 1, remaining: 1 }
  }

  return { synced: pendingCount, failed: 0, remaining: 0 }
}

export interface PostVisitResult {
  serverId: string
}

/** Fire-and-forget style acknowledgement (optional hook for analytics) */
export async function acknowledgeVisitQueued(): Promise<PostVisitResult> {
  await delay(120)
  return { serverId: `ACK-${Date.now()}` }
}
