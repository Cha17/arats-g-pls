import { db } from '../db';
import { users, type User, type NewUser, type UserRole } from '../db/schema';
import { eq } from 'drizzle-orm';
import { KindeService } from './kindeService';

export class UserService {
  // Map Kinde roles to our application roles
  private static mapKindeRoleToUserRole(kindeRoles: string[]): UserRole {
    if (kindeRoles.includes('admin')) return 'admin-arats';
    return 'arats-user';
  }

  // Create or update user from Kinde data
  static async createOrUpdateUser(kindeUser: {
    id: string;
    email: string;
    given_name?: string;
    family_name?: string;
  }, decodedToken?: any): Promise<User> {
    const existingUser = await this.getUserByKindeId(kindeUser.id);
    
    // Get roles from Kinde token
    const kindeRoles = decodedToken ? KindeService.getRolesFromToken(decodedToken) : [];
    const userRole = this.mapKindeRoleToUserRole(kindeRoles);
    
    if (existingUser) {
      // Update existing user
      const [updatedUser] = await db
        .update(users)
        .set({
          email: kindeUser.email,
          firstName: kindeUser.given_name,
          lastName: kindeUser.family_name,
          role: userRole, // Update role from Kinde
          updatedAt: new Date(),
        })
        .where(eq(users.kindeId, kindeUser.id))
        .returning();
      
      return updatedUser;
    } else {
      // Create new user
      const [newUser] = await db
        .insert(users)
        .values({
          kindeId: kindeUser.id,
          email: kindeUser.email,
          firstName: kindeUser.given_name,
          lastName: kindeUser.family_name,
          role: userRole, // Set role from Kinde
        })
        .returning();
      
      return newUser;
    }
  }

  // Get user by Kinde ID
  static async getUserByKindeId(kindeId: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.kindeId, kindeId))
      .limit(1);
    
    return user || null;
  }

  // Get user by email
  static async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    
    return user || null;
  }

  // Update user role (admin function)
  static async updateUserRole(kindeId: string, role: UserRole): Promise<User | null> {
    const [updatedUser] = await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.kindeId, kindeId))
      .returning();
    
    return updatedUser || null;
  }

  // Get all users (admin function)
  static async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }
}