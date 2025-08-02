const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Debug environment variables
console.log('🔧 Environment Debug:');
console.log('🔧 NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('🔧 API_BASE_URL:', API_BASE_URL);
console.log('🔧 NODE_ENV:', process.env.NODE_ENV);

// Helper function to get a working image URL
export function getImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  
  // If it's already a valid URL, return it
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If it's a Google Drive ID, convert to proper URL
  if (imageUrl.includes('drive.google.com')) {
    // Extract file ID from Google Drive URL
    const match = imageUrl.match(/[-\w]{25,}/);
    if (match) {
      return `https://drive.google.com/uc?export=view&id=${match[0]}`;
    }
  }
  
  // Fallback to placeholder image
  return `https://picsum.photos/400/300?random=${Math.random()}`;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  image_urls: string | null;
  date: string;
  location: string | null;
  author_name: string;
  price: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  registration_date: string;
  is_paid: boolean;
  status: 'confirmed' | 'waitlist' | 'cancelled';
}

export interface ApiResponse<T> {
  success: boolean;
  events?: T[];
  event?: T;
  registrations?: any[];
  count?: number;
  error?: string;
  message?: string;
  registration?: EventRegistration;
}

// Helper function to handle API responses
async function handleApiResponse<T>(response: Response): Promise<T> {
  console.log(`🔍 API Response Status: ${response.status}`);
  console.log(`🔍 API Response Headers:`, Object.fromEntries(response.headers.entries()));
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ API Error ${response.status}:`, errorText);
    throw new Error(`API Error ${response.status}: ${errorText || response.statusText}`);
  }

  try {
    const data = await response.json();
    console.log(`✅ API Response Data:`, data);
    return data;
  } catch (error) {
    console.error('❌ JSON Parse Error:', error);
    const responseText = await response.text();
    console.error('❌ Response Text:', responseText);
    throw new Error(`Invalid JSON response from server: ${responseText.substring(0, 100)}...`);
  }
}

// Fetch all events
export async function fetchEvents(): Promise<Event[]> {
  try {
    console.log('🔄 fetchEvents: Starting...');
    console.log('🔄 fetchEvents: API_BASE_URL =', API_BASE_URL);
    console.log('🔄 fetchEvents: Fetching from:', `${API_BASE_URL}/events`);
    
    const response = await fetch(`${API_BASE_URL}/events`);
    console.log('🔄 fetchEvents: Response received');
    
    const data: ApiResponse<Event> = await handleApiResponse(response);
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch events');
    }
    
    console.log(`✅ fetchEvents: Successfully fetched ${data.events?.length || 0} events`);
    return data.events || [];
  } catch (error) {
    console.error('❌ fetchEvents: Error:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    }
    throw error;
  }
}

// Fetch featured events for carousel
export async function fetchFeaturedEvents(): Promise<Event[]> {
  try {
    console.log('🔄 fetchFeaturedEvents: Starting...');
    console.log('🔄 fetchFeaturedEvents: API_BASE_URL =', API_BASE_URL);
    console.log('🔄 fetchFeaturedEvents: Fetching from:', `${API_BASE_URL}/events/featured`);
    
    const response = await fetch(`${API_BASE_URL}/events/featured`);
    console.log('🔄 fetchFeaturedEvents: Response received');
    
    const data: ApiResponse<Event> = await handleApiResponse(response);
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch featured events');
    }
    
    console.log(`✅ fetchFeaturedEvents: Successfully fetched ${data.events?.length || 0} events`);
    return data.events || [];
  } catch (error) {
    console.error('❌ fetchFeaturedEvents: Error:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    }
    throw error;
  }
}

// Fetch single event
export async function fetchEvent(id: string): Promise<Event> {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    const data: ApiResponse<Event> = await handleApiResponse(response);
    
    if (!data.success) {
      throw new Error(data.error || 'Event not found');
    }
    
    return data.event!;
  } catch (error) {
    console.error('Error fetching event:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    }
    throw error;
  }
}

// Register for an event
export async function registerForEvent(eventId: string, userId: string): Promise<EventRegistration> {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
    
    const data: ApiResponse<EventRegistration> = await handleApiResponse(response);
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to register for event');
    }
    
    return data.registration!;
  } catch (error) {
    console.error('Error registering for event:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    }
    throw error;
  }
}

// Get user's event registrations
export async function fetchUserRegistrations(userId: string): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/events/user/${userId}/registrations`);
    const data: ApiResponse<any> = await handleApiResponse(response);
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch user registrations');
    }
    
    return data.registrations || [];
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    }
    throw error;
  }
}

// Cancel event registration
export async function cancelRegistration(eventId: string, userId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
    
    const data: ApiResponse<any> = await handleApiResponse(response);
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to cancel registration');
    }
  } catch (error) {
    console.error('Error cancelling registration:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    }
    throw error;
  }
} 