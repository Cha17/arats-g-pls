import { Hono } from 'hono';
import { kyselyDb } from '../db';
import { z } from 'zod';

const eventsRouter = new Hono();

// Validation schemas
const createEventSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  image_urls: z.string().max(2000).optional(), // Single image URL for now
  date: z.string().datetime(),
  location: z.string().max(255).optional(),
  author_name: z.string().min(1).max(255),
  price: z.number().min(0).default(0),
});

const registerForEventSchema = z.object({
  user_id: z.string().uuid(),
});

// Get all events
eventsRouter.get('/', async (c) => {
  try {
    const events = await kyselyDb
      .selectFrom('events')
      .selectAll()
      .where('is_active', '=', true)
      .orderBy('date', 'desc')
      .execute();

    return c.json({ 
      success: true, 
      events,
      count: events.length 
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch events' 
    }, 500);
  }
});

// Get featured events for carousel (latest 5 active events)
eventsRouter.get('/featured', async (c) => {
  try {
    const featuredEvents = await kyselyDb
      .selectFrom('events')
      .selectAll()
      .where('is_active', '=', true)
      .orderBy('date', 'desc')
      .limit(5)
      .execute();

    return c.json({ 
      success: true, 
      events: featuredEvents 
    });
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch featured events' 
    }, 500);
  }
});

// Get single event by ID
eventsRouter.get('/:id', async (c) => {
  const eventId = c.req.param('id');

  try {
    const event = await kyselyDb
      .selectFrom('events')
      .selectAll()
      .where('id', '=', eventId)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!event) {
      return c.json({ 
        success: false, 
        error: 'Event not found' 
      }, 404);
    }

    return c.json({ 
      success: true, 
      event 
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch event' 
    }, 500);
  }
});

// Register for an event
eventsRouter.post('/:id/register', async (c) => {
  const eventId = c.req.param('id');
  
  try {
    // Validate request body
    const body = await c.req.json();
    const validatedData = registerForEventSchema.parse(body);
    const { user_id } = validatedData;

    // Check if event exists and is active
    const event = await kyselyDb
      .selectFrom('events')
      .select(['id', 'title'])
      .where('id', '=', eventId)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!event) {
      return c.json({ 
        success: false, 
        error: 'Event not found or inactive' 
      }, 404);
    }

    // Check if user is already registered
    const existingRegistration = await kyselyDb
      .selectFrom('event_registrations')
      .select(['id'])
      .where('event_id', '=', eventId)
      .where('user_id', '=', user_id)
      .executeTakeFirst();

    if (existingRegistration) {
      return c.json({ 
        success: false, 
        error: 'User is already registered for this event' 
      }, 409);
    }

    // Create registration
    const newRegistration = await kyselyDb
      .insertInto('event_registrations')
      .values({
        event_id: eventId,
        user_id: user_id,
        is_paid: false, // Will be updated when payment is implemented
        status: 'confirmed',
      })
      .returning(['id', 'event_id', 'user_id', 'registration_date', 'is_paid', 'status'])
      .executeTakeFirst();

    return c.json({ 
      success: true, 
      message: 'Successfully registered for event',
      registration: newRegistration 
    }, 201);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ 
        success: false, 
        error: 'Invalid request data',
        details: error.issues 
      }, 400);
    }

    console.error('Error registering for event:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to register for event' 
    }, 500);
  }
});

// Get user's event registrations
eventsRouter.get('/user/:userId/registrations', async (c) => {
  const userId = c.req.param('userId');

  try {
    const registrations = await kyselyDb
      .selectFrom('event_registrations')
      .innerJoin('events', 'events.id', 'event_registrations.event_id')
      .select([
        'event_registrations.id',
        'event_registrations.registration_date',
        'event_registrations.is_paid',
        'event_registrations.status',
        'events.id as event_id',
        'events.title',
        'events.date',
        'events.location',
        'events.author_name',
        'events.price',
        'events.image_urls',
      ])
      .where('event_registrations.user_id', '=', userId)
      .orderBy('events.date', 'desc')
      .execute();

    return c.json({ 
      success: true, 
      registrations 
    });
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch user registrations' 
    }, 500);
  }
});

// Cancel event registration
eventsRouter.delete('/:id/register', async (c) => {
  const eventId = c.req.param('id');
  
  try {
    const body = await c.req.json();
    const { user_id } = body;

    if (!user_id) {
      return c.json({ 
        success: false, 
        error: 'User ID is required' 
      }, 400);
    }

    // Check if registration exists
    const registration = await kyselyDb
      .selectFrom('event_registrations')
      .select(['id'])
      .where('event_id', '=', eventId)
      .where('user_id', '=', user_id)
      .executeTakeFirst();

    if (!registration) {
      return c.json({ 
        success: false, 
        error: 'Registration not found' 
      }, 404);
    }

    // Delete registration
    await kyselyDb
      .deleteFrom('event_registrations')
      .where('event_id', '=', eventId)
      .where('user_id', '=', user_id)
      .execute();

    return c.json({ 
      success: true, 
      message: 'Registration cancelled successfully' 
    });

  } catch (error) {
    console.error('Error cancelling registration:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to cancel registration' 
    }, 500);
  }
});

export default eventsRouter; 