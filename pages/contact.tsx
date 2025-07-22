import { useState } from 'react';
import Layout from '@/components/Layout';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input name="name" placeholder="Your Name" className="border p-2 w-full" required />
        <input name="email" type="email" placeholder="Your Email" className="border p-2 w-full" required />
        <textarea name="message" placeholder="Your Message" className="border p-2 w-full h-32" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        {status === 'success' && <p className="text-green-600">Message sent!</p>}
        {status === 'error' && <p className="text-red-600">Something went wrong. Try again.</p>}
      </form>
    </Layout>
  );
}