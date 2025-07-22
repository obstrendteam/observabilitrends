export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    if (name && email && message) {
      console.log('Contact form submission:', { name, email, message });
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: 'Missing fields' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}