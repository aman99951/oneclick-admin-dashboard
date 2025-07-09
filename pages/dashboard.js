import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Search, Filter, Eye, Edit2, Check, X, Calendar, User, Car, MapPin, LogOut } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { withAuth } from '../lib/auth';

export default function Dashboard({ initialListings }) {
  const [listings, setListings] = useState(initialListings);
  const [filteredListings, setFilteredListings] = useState(initialListings);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { showNotification } = useNotification();
  const router = useRouter();

  const itemsPerPage = 10;

  useEffect(() => {
    let filtered = listings;

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(listing => listing.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredListings(filtered);
    setCurrentPage(1);
  }, [selectedStatus, searchTerm, listings]);


  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, startIndex + itemsPerPage);


  const handleStatusChange = async (id, status) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/listings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {
        setListings(prev => prev.map(listing => 
          listing.id === id ? { ...listing, status } : listing
        ));
        showNotification(data.message, 'success');
      } else {
        showNotification(data.message || 'Failed to update listing', 'error');
      }
    } catch (err) {
      showNotification('An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (listing) => {
    setEditingListing({ ...listing });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/listings/${editingListing.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingListing),
      });

      const data = await res.json();

      if (data.success) {
        setListings(prev => prev.map(listing =>
          listing.id === editingListing.id ? data.listing : listing
        ));
        setShowEditModal(false);
        setEditingListing(null);
        showNotification(data.message, 'success');
      } else {
        showNotification(data.message || 'Failed to update listing', 'error');
      }
    } catch (err) {
      showNotification('An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      showNotification('Logout failed', 'error');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
   
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-slate-300 mt-1 text-sm sm:text-base">Manage car rental listings</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-slate-300">
                  <span className="font-semibold text-white">{listings.length}</span> Total Listings
                </div>
                <div className="hidden sm:block w-px h-6 bg-slate-600"></div>
                <div className="text-sm text-slate-300">
                  <span className="font-semibold text-green-400">{listings.filter(l => l.status === 'approved').length}</span> Approved
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1">
              <div className="relative flex-1 sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 sm:min-w-0">
                <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <select
                  className="flex-1 sm:flex-initial border border-gray-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-end">
              <div className="flex items-center px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                {listings.filter(l => l.status === 'pending').length} Pending
              </div>
              <div className="flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                {listings.filter(l => l.status === 'approved').length} Approved
              </div>
              <div className="flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                {listings.filter(l => l.status === 'rejected').length} Rejected
              </div>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Listing Details
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                    Submitted By
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                    Performance
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {currentListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Car className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-gray-900 truncate">{listing.title}</div>
                          <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 mt-1 gap-1 sm:gap-2">
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                              <span className="truncate">{listing.location}</span>
                            </div>
                            <div className="hidden sm:block text-gray-300">•</div>
                            <div className="font-medium text-gray-700">
                              ${listing.price}/day
                            </div>
                          </div>
                          <div className="sm:hidden mt-1">
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                              {listing.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                      <div className="text-sm text-gray-900 truncate max-w-xs">{listing.submittedBy}</div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span className="truncate">{formatDate(listing.submittedAt)}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-3 h-3 mr-1" />
                        {listing.views} views
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                        {listing.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(listing.id, 'approved')}
                              disabled={loading}
                              className="inline-flex items-center justify-center px-2.5 py-1.5 text-xs font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-sm disabled:opacity-50"
                            >
                              <Check className="w-3 h-3 sm:mr-1" />
                              <span className="hidden sm:inline">Approve</span>
                            </button>
                            <button
                              onClick={() => handleStatusChange(listing.id, 'rejected')}
                              disabled={loading}
                              className="inline-flex items-center justify-center px-2.5 py-1.5 text-xs font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-sm disabled:opacity-50"
                            >
                              <X className="w-3 h-3 sm:mr-1" />
                              <span className="hidden sm:inline">Reject</span>
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleEdit(listing)}
                          disabled={loading}
                          className="inline-flex items-center justify-center px-2.5 py-1.5 text-xs font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-sm disabled:opacity-50"
                        >
                          <Edit2 className="w-3 h-3 sm:mr-1" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(startIndex + itemsPerPage, filteredListings.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredListings.length}</span> results
                  </p>
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                        currentPage === i + 1
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

     
      {showEditModal && editingListing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Listing</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingListing.title}
                    onChange={(e) => setEditingListing({...editingListing, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingListing.location}
                    onChange={(e) => setEditingListing({...editingListing, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per day</label>
                  <input
                    type="number"
                    value={editingListing.price}
                    onChange={(e) => setEditingListing({...editingListing, price: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editingListing.category}
                    onChange={(e) => setEditingListing({...editingListing, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="economy">Economy</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editingListing.description || ''}
                    onChange={(e) => setEditingListing({...editingListing, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withAuth(async (context) => {
  
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const host = context.req.headers.host;
  const baseUrl = `${protocol}://${host}`;
  
  try {
    const res = await fetch(`${baseUrl}/api/listings`, {
      headers: {
        cookie: context.req.headers.cookie || '',
      },
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch listings');
    }
    
    const data = await res.json();
    
    return {
      props: {
        initialListings: data.listings,
      },
    };
  } catch (error) {
    console.error('Error fetching listings:', error);
    return {
      props: {
        initialListings: [],
      },
    };
  }
});
