import clsx from "clsx"
import { useState } from "react"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: "critical" | "warning" | "info"
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "n1",
    title: "Critical: Geo-fence override pending",
    message: "2 geo exceptions in Lusaka Central A require immediate attention",
    time: "2 min ago",
    type: "critical",
    read: false,
  },
  {
    id: "n2",
    title: "Float stockout alert",
    message: "Ndola CBD outlet below 15% threshold",
    time: "15 min ago",
    type: "critical",
    read: false,
  },
  {
    id: "n3",
    title: "Route adherence below target",
    message: "Team Central performance dropped to 82%",
    time: "1 hour ago",
    type: "warning",
    read: false,
  },
  {
    id: "n4",
    title: "Supervisor approval pending",
    message: "3 workflow approvals awaiting your review",
    time: "2 hours ago",
    type: "warning",
    read: true,
  },
  {
    id: "n5",
    title: "Daily sync completed",
    message: "All field data synchronized successfully",
    time: "3 hours ago",
    type: "info",
    read: true,
  },
]

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [notifs, setNotifs] = useState(notifications)
  const unreadCount = notifs.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-black/20 animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed right-4 top-20 z-50 w-full max-w-md animate-scale-in">
        <div className="rounded-2xl border-2 border-border bg-surface shadow-2xl">
          <div className="border-b border-border bg-gradient-to-r from-surface to-brand-50/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-text">Notifications</h2>
                <p className="text-xs text-text-muted mt-0.5">
                  {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium transition-all hover:bg-surface-subtle"
              >
                Close
              </button>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="mt-3 text-xs font-semibold text-brand-700 hover:text-brand-800 transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[500px] overflow-y-auto p-4 space-y-2">
            {notifs.map((notif, idx) => (
              <button
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={clsx(
                  "w-full rounded-xl border-2 p-4 text-left transition-all duration-200 hover:shadow-md animate-fade-in",
                  !notif.read && "bg-brand-50/50 border-brand-600/30",
                  notif.read && "bg-surface border-border opacity-70 hover:opacity-100",
                  notif.type === "critical" && !notif.read && "border-red-c/40 bg-red-bg/30",
                  notif.type === "warning" && !notif.read && "border-amber-w/40 bg-amber-bg/30"
                )}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className={clsx(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    notif.type === "critical" && "bg-red-c",
                    notif.type === "warning" && "bg-amber-w",
                    notif.type === "info" && "bg-brand-600"
                  )}>
                    {notif.type === "critical" && (
                      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    {notif.type === "warning" && (
                      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    {notif.type === "info" && (
                      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-text text-sm leading-tight">{notif.title}</p>
                      {!notif.read && (
                        <span className="h-2 w-2 rounded-full bg-brand-600 shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-text-muted mt-1.5 leading-relaxed">{notif.message}</p>
                    <p className="text-xs text-text-muted mt-2 font-medium">{notif.time}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-border bg-surface-subtle px-6 py-3">
            <button className="text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors">
              View all notifications →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
