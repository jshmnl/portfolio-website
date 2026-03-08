'use server'

import { db } from '@/lib/db'

export interface ContactResult {
  success: boolean
  error?: string
}

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const name    = (formData.get('name')    as string | null)?.trim() ?? ''
  const email   = (formData.get('email')   as string | null)?.trim() ?? ''
  const subject = (formData.get('subject') as string | null)?.trim() ?? ''
  const message = (formData.get('message') as string | null)?.trim() ?? ''

  if (name.length < 2)    return { success: false, error: 'Name must be at least 2 characters.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: 'Please enter a valid email address.' }
  if (subject.length < 2) return { success: false, error: 'Subject must be at least 2 characters.' }
  if (message.length < 10) return { success: false, error: 'Message must be at least 10 characters.' }

  try {
    await db.contact.create({ data: { name, email, subject, message } })
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to send. Please try again later.' }
  }
}
