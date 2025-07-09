import { getListings } from '../../../lib/db';

export default function handler(req, res) {
  const token = req.cookies['auth-token'];
  
  if (!token || !token.startsWith('mock-jwt-token-')) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const listings = getListings();
  return res.status(200).json({ success: true, listings });
}