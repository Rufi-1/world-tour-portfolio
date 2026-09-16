import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, Mail } from 'lucide-react';
import { resume } from '@/data/resume';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const message = String(form.get('message') || '').trim();
    if (!name || !email || !message || !email.includes('@')) {
      setError('Please complete every field with a valid email address.');
      return;
    }
    setError('');
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
    window.location.href = `mailto:${resume.email}?subject=${subject}&body=${body}`;
    setSent(true);
    event.currentTarget.reset();
  };

  return <div className="contact-form-wrap"><div className="form-heading"><span>01 / INBOX</span><Mail size={17} /></div>{sent ? <div className="form-success"><Check size={24} /><strong>Your message is ready to send.</strong><p>Your email app should open with the details filled in.</p><button className="text-link" onClick={() => setSent(false)}>Send another <ArrowUpRight size={14} /></button></div> : <form className="contact-form" onSubmit={handleSubmit}><label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" /></label><label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label><label>Message<textarea name="message" rows={4} placeholder="Tell me what you're working on..." /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit">Open email <ArrowUpRight size={16} /></button></form>}</div>;
}
