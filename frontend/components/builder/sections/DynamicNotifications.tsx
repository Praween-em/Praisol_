'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, Info, AlertTriangle, Calendar } from 'lucide-react';
import { EditableText } from '../atoms/EditableText';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  is_important: boolean;
  published_at: string;
}

export interface DynamicNotificationsProps {
  id?: string;
  title?: string;
  limit?: number;
  tenantSlug?: string;
}

const dummyNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Annual Sports Day 2026',
    message: 'The annual sports day is scheduled for next Friday. All students must wear their house jerseys.',
    is_important: true,
    published_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'New Library Books',
    message: 'We have received over 500 new titles in the school library. Check them out today!',
    is_important: false,
    published_at: new Date().toISOString()
  }
];

export const DynamicNotifications = ({
  id = '',
  title = 'Important Notices',
  limit = 5,
  tenantSlug
}: DynamicNotificationsProps) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tenantSlug) {
      setLoading(true);
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/notifications`, {
        headers: { 'X-Tenant-ID': tenantSlug }
      })
      .then(res => {
        setNotifications(res.data.data.slice(0, limit));
      })
      .catch(err => {
        console.error('Failed to fetch notifications:', err);
      })
      .finally(() => setLoading(false));
    } else {
      setNotifications(dummyNotifications);
    }
  }, [tenantSlug, limit]);

  return (
    <section className="py-12 px-4 sm:px-6 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
            <Bell size={24} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            <EditableText id={id} propKey="title" value={title} />
          </h2>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="p-8 text-center text-zinc-500">Loading notices...</div>
          ) : notifications.length > 0 ? (
            notifications.map((note) => (
              <div 
                key={note.id} 
                className={`p-5 rounded-2xl border transition-all ${
                  note.is_important 
                    ? 'bg-amber-500/5 border-amber-500/20' 
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex gap-4">
                  <div className={`mt-1 ${note.is_important ? 'text-amber-500' : 'text-zinc-500'}`}>
                    {note.is_important ? <AlertTriangle size={20} /> : <Info size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-bold ${note.is_important ? 'text-amber-200' : 'text-zinc-100'}`}>
                        {note.title}
                      </h3>
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(note.published_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                      {note.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-zinc-600 border border-dashed border-zinc-800 rounded-3xl">
              No recent notifications to show.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
