import { getListingById, updateListing } from '../../../../lib/db';

export default function handler(req, res) {
  const token = req.cookies['auth-token'];
  
  if (!token || !token.startsWith('mock-jwt-token-')) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    const listing = getListingById(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    return res.status(200).json({ success: true, listing });
  }

  if (req.method === 'PUT') {
    const { title, location, price, category, description } = req.body;
    
    const updatedListing = updateListing(id, {
      title,
      location,
      price: parseInt(price),
      category,
      description
    });
    
    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Listing updated successfully',
      listing: updatedListing 
    });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}


export const withAuth = (gssp) => {
  return async (context) => {
    const token = context.req.cookies['auth-token'];
    
    if (!token || !token.startsWith('mock-jwt-token-')) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (gssp) {
      return await gssp(context);
    }

    return { props: {} };
  };
};