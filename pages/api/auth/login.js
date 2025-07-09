export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (email === 'admin@example.com' && password === 'admin123') {
   
    const token = 'mock-jwt-token-' + Date.now();
    
    res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Path=/; Max-Age=3600`);
    return res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      user: { email: 'admin@example.com', role: 'admin' }
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
}
