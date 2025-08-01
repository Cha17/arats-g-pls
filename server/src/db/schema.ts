import { pgTable, uuid, varchar, boolean, timestamp, pgEnum, decimal, integer, uniqueIndex } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['arats-user', 'admin-arats']);
export const registrationStatusEnum = pgEnum('registration_status', ['confirmed', 'waitlist', 'cancelled']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  kindeId: varchar('kinde_id', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  role: userRoleEnum('role').notNull().default('arats-user'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Events table
export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }),
  imageUrls: varchar('image_urls', { length: 2000 }), // JSON array of Google Drive URLs
  date: timestamp('date', { withTimezone: true }).notNull(),
  location: varchar('location', { length: 255 }),
  authorName: varchar('author_name', { length: 255 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).default('0'), // 0 = free
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Event registrations table
export const eventRegistrations = pgTable('event_registrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id').references(() => events.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  registrationDate: timestamp('registration_date', { withTimezone: true }).defaultNow(),
  isPaid: boolean('is_paid').default(false),
  status: registrationStatusEnum('status').default('confirmed'),
}, (table) => ({
  uniqueRegistration: uniqueIndex('unique_registration').on(table.eventId, table.userId),
}));

// Type inference for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserRole = 'arats-user' | 'admin-arats';

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type NewEventRegistration = typeof eventRegistrations.$inferInsert;
export type RegistrationStatus = 'confirmed' | 'waitlist' | 'cancelled';