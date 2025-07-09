export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  res.setHeader('Set-Cookie', 'auth-token=; HttpOnly; Path=/; Max-Age=0');
  return res.status(200).json({ success: true, message: 'Logout successful' });
}