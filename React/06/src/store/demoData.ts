import type {
  Comment,
  DesignFile,
  DesignNotification,
  DesignUser,
} from './types'

export const teamUsers: DesignUser[] = [
  { id: 'u-alex', name: 'Alex Chen', role: 'Product Design' },
  { id: 'u-maya', name: 'Maya Patel', role: 'Frontend Systems' },
  { id: 'u-omar', name: 'Omar Singh', role: 'Design Ops' },
]

export const starterFiles: DesignFile[] = [
  {
    id: 'file-hero',
    name: 'Landing Hero',
    content:
      'Goals:\n- Clarify the collaboration promise\n- Reduce handoff friction\n- Show reviewer activity without noise',
    updatedAt: '2026-03-12T08:00:00.000Z',
  },
  {
    id: 'file-billing',
    name: 'Billing Flow',
    content:
      'Audit points:\n- Trial upgrade path\n- Invoice download CTA\n- Failure states for card refresh',
    updatedAt: '2026-03-12T08:24:00.000Z',
  },
  {
    id: 'file-comments',
    name: 'Comment Threads',
    content:
      'Experiments:\n- Resolve state visibility\n- Mention routing\n- Inline unread markers',
    updatedAt: '2026-03-12T08:48:00.000Z',
  },
]

export const starterComments: Comment[] = [
  {
    id: 'comment-1',
    fileId: 'file-hero',
    author: 'Maya Patel',
    text: 'The hero headline is strong, but the secondary CTA still feels hidden.',
    createdAt: '2026-03-12T08:09:00.000Z',
  },
  {
    id: 'comment-2',
    fileId: 'file-hero',
    author: 'Omar Singh',
    text: 'Add notification language so reviewers know what triggers an inbox update.',
    createdAt: '2026-03-12T08:11:00.000Z',
  },
  {
    id: 'comment-3',
    fileId: 'file-comments',
    author: 'Alex Chen',
    text: 'Unread markers should clear only when the thread is actually opened.',
    createdAt: '2026-03-12T08:53:00.000Z',
  },
]

export const starterNotifications: DesignNotification[] = [
  {
    id: 'notification-1',
    message: 'Alex assigned Billing Flow to Maya for UI polish.',
    read: false,
    createdAt: '2026-03-12T08:28:00.000Z',
  },
  {
    id: 'notification-2',
    message: 'Comment Threads has new reviewer feedback.',
    read: false,
    createdAt: '2026-03-12T08:55:00.000Z',
  },
  {
    id: 'notification-3',
    message: 'The landing hero draft was shared with the stakeholder channel.',
    read: true,
    createdAt: '2026-03-12T07:42:00.000Z',
  },
]
