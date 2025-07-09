import { updateListingStatus } from '../../../../lib/db';

export default function handler(req, res) {
  const token = req.cookies['auth-token'];
  
  if (!token || !token.startsWith('mock-jwt-token-')) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  const { status } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const updatedListing = updateListingStatus(id, status);
  
  if (!updatedListing) {
    return res.status(404).json({ message: 'Listing not found' });
  }

  return res.status(200).json({ 
    success: true, 
    message: `Listing ${status} successfully`,
    listing: updatedListing 
  });
}