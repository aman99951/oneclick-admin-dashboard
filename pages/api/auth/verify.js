export default function handler(req, res) {
  const token = req.cookies['auth-token'];
  
  if (!token || !token.startsWith('mock-jwt-token-')) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  return res.status(200).json({ 
    success: true, 
    user: { email: 'admin@example.com', role: 'admin' }
  });
}
