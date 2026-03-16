'use client';
import React from 'react';

interface FormProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  successMessage?: string;
  backgroundColor?: string;
  // Injected by ComponentRenderer on deployed sites; absent in builder preview
  tenantSlug?: string;
  // Builder component ID used to identify which form was submitted
  componentId?: string;
}

export default function FormComponent({
  title = 'Get in Touch',
  description = 'Fill out the form below and we will get back to you soon.',
  buttonLabel = 'Send Message',
  successMessage = 'Thank you! Your message has been sent.',
  backgroundColor = '#18181b',
  tenantSlug,
  componentId,
}: FormProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);
  const messageRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Builder preview mode — no API call, just show the success state
    if (!tenantSlug) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      return;
    }

    // Deployed site — POST to backend
    setLoading(true);
    try {
      const data: Record<string, string> = {};
      if (nameRef.current?.value)    data.name    = nameRef.current.value;
      if (emailRef.current?.value)   data.email   = emailRef.current.value;
      if (phoneRef.current?.value)   data.phone   = phoneRef.current.value;
      if (messageRef.current?.value) data.message = messageRef.current.value;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/public/form-submissions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Tenant-ID': tenantSlug,
          },
          body: JSON.stringify({
            form_id:    componentId || null,
            form_title: title,
            data,
          }),
        }
      );

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Submission failed');

      setSubmitted(true);
      // Reset form fields
      if (nameRef.current)    nameRef.current.value    = '';
      if (emailRef.current)   emailRef.current.value   = '';
      if (phoneRef.current)   phoneRef.current.value   = '';
      if (messageRef.current) messageRef.current.value = '';
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ backgroundColor }}
      className="p-8 rounded-2xl border border-zinc-800 shadow-xl w-full max-w-xl mx-auto"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-zinc-500 text-sm">{description}</p>
      </div>

      {submitted ? (
        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center animate-in fade-in zoom-in-95 duration-300">
          <svg className="w-8 h-8 mx-auto mb-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="font-semibold">{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
            <input 
              ref={nameRef}
              type="text" 
              required
              placeholder="John Doe"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-indigo-500 transition-all"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email</label>
              <input 
                ref={emailRef}
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Phone</label>
              <input 
                ref={phoneRef}
                type="tel" 
                placeholder="+91 8374950475"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Message</label>
            <textarea 
              ref={messageRef}
              required
              rows={4}
              placeholder="How can we help you?"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-indigo-500 transition-all resize-none"
            />
          </div>

          {error && (
            <div className="px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all mt-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Sending...
              </>
            ) : buttonLabel}
          </button>
        </form>
      )}
    </div>
  );
}
