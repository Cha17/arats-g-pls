// import { db } from '../db'
// import { users } from '../db/schema'
// import { eq } from 'drizzle-orm'

// interface KindeUser {
//   id: string
//   email: string
//   given_name?: string
//   family_name?: string
//   picture?: string
//   phone_number?: string
//   roles?: Array<{ key: string; name: string }>
//   created_on?: string
//   last_signed_in?: string
// }

// export class UserSyncService {
//   /**
//    * Sync user from Kinde to local database
//    */
//   static async syncUserFromKinde(kindeUser: KindeUser) {
//     try {
//       const userRole = this.extractUserRole(kindeUser.roles || [])
      
//       // Check if user exists
//       const [existingUser] = await db
//         .select()
//         .from(users)
//         .where(eq(users.kindeId, kindeUser.id))
//         .limit(1)

//       const userData = {
//         kindeId: kindeUser.id,
//         email: kindeUser.email,
//         name: `${kindeUser.given_name || ''} ${kindeUser.family_name || ''}`.trim(),
//         firstName: kindeUser.given_name || null,
//         lastName: kindeUser.family_name || null,
//         role: userRole,
//         profilePicture: kindeUser.picture || null,
//         phone: kindeUser.phone_number || null,
//         lastLoginAt: kindeUser.last_signed_in ? new Date(kindeUser.last_signed_in) : new Date(),
//         lastSyncAt: new Date(),
//         updatedAt: new Date(),
//       }

//       if (existingUser) {
//         // Update existing user
//         const [updatedUser] = await db
//           .update(users)
//           .set(userData)
//           .where(eq(users.kindeId, kindeUser.id))
//           .returning()
        
//         console.log('User updated:', updatedUser.email)
//         return updatedUser
//       } else {
//         // Create new user
//         const [newUser] = await db
//           .insert(users)
//           .values({
//             ...userData,
//             createdAt: kindeUser.created_on ? new Date(kindeUser.created_on) : new Date(),
//           })
//           .returning()
        
//         console.log('New user created:', newUser.email)
//         return newUser
//       }
//     } catch (error) {
//       console.error('Error syncing user:', error)
//       throw error
//     }
//   }

//   /**
//    * Bulk sync users from Kinde (for initial setup or periodic sync)
//    */
//   static async bulkSyncUsersFromKinde() {
//     try {
//       // You would call Kinde Management API to get all users
//       // This is a placeholder for the actual implementation
//       const kindeUsers = await this.fetchAllUsersFromKinde()
      
//       for (const kindeUser of kindeUsers) {
//         await this.syncUserFromKinde(kindeUser)
//       }
      
//       console.log(`Synced ${kindeUsers.length} users from Kinde`)
//     } catch (error) {
//       console.error('Error in bulk sync:', error)
//       throw error
//     }
//   }

//   /**
//    * Get user from local database, sync from Kinde if not found
//    */
//   static async getUserWithFallback(kindeId: string, kindeUserData?: KindeUser) {
//     try {
//       // Try to get user from local database first
//       const [localUser] = await db
//         .select()
//         .from(users)
//         .where(eq(users.kindeId, kindeId))
//         .limit(1)

//       if (localUser) {
//         // Update last sync time if user data is provided
//         if (kindeUserData) {
//           await this.syncUserFromKinde(kindeUserData)
//           return await db
//             .select()
//             .from(users)
//             .where(eq(users.kindeId, kindeId))
//             .limit(1)
//             .then(users => users[0])
//         }
//         return localUser
//       }

//       // If user not found locally and we have Kinde data, sync it
//       if (kindeUserData) {
//         return await this.syncUserFromKinde(kindeUserData)
//       }

//       // If we don't have Kinde data, try to fetch from Kinde API
//       const kindeUser = await this.fetchUserFromKinde(kindeId)
//       if (kindeUser) {
//         return await this.syncUserFromKinde(kindeUser)
//       }

//       return null
//     } catch (error) {
//       console.error('Error getting user with fallback:', error)
//       return null
//     }
//   }

//   /**
//    * Extract user role from Kinde roles
//    */
//   private static extractUserRole(roles: Array<{ key: string; name: string }>): 'arats-user' | 'admin-arats' {
//     // Check for admin role first
//     if (roles.some(role => role.key === 'admin-arats' || role.name === 'admin-arats')) {
//       return 'admin-arats'
//     }
    
//     // Default to user role
//     return 'arats-user'
//   }

//   /**
//    * Fetch single user from Kinde Management API
//    */
//   private static async fetchUserFromKinde(kindeId: string): Promise<KindeUser | null> {
//     try {
//       // You would implement Kinde Management API call here
//       // This requires setting up M2M application in Kinde
//       const response = await fetch(`${process.env.KINDE_ISSUER_URL}/api/v1/users/${kindeId}`, {
//         headers: {
//           'Authorization': `Bearer ${await this.getKindeManagementToken()}`,
//           'Accept': 'application/json',
//         },
//       })

//       if (response.ok) {
//         return await response.json()
//       }
      
//       return null
//     } catch (error) {
//       console.error('Error fetching user from Kinde:', error)
//       return null
//     }
//   }

//   /**
//    * Fetch all users from Kinde Management API
//    */
//   private static async fetchAllUsersFromKinde(): Promise<KindeUser[]> {
//     try {
//       // Implement pagination for large user bases
//       const response = await fetch(`${process.env.KINDE_ISSUER_URL}/api/v1/users`, {
//         headers: {
//           'Authorization': `Bearer ${await this.getKindeManagementToken()}`,
//           'Accept': 'application/json',
//         },
//       })

//       if (response.ok) {
//         const data = await response.json()
//         return data.users || []
//       }
      
//       return []
//     } catch (error) {
//       console.error('Error fetching users from Kinde:', error)
//       return []
//     }
//   }

//   /**
//    * Get Kinde Management API token
//    */
//   private static async getKindeManagementToken(): Promise<string> {
//     // Implement M2M token exchange
//     // You'll need to create a M2M application in Kinde for this
//     const response = await fetch(`${process.env.KINDE_ISSUER_URL}/oauth2/token`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         'grant_type': 'client_credentials',
//         'client_id': process.env.KINDE_M2M_CLIENT_ID!,
//         'client_secret': process.env.KINDE_M2M_CLIENT_SECRET!,
//         'audience': `${process.env.KINDE_ISSUER_URL}/api`,
//       }),
//     })

//     const data = await response.json()
//     return data.access_token
//   }
// }

// export default UserSyncService