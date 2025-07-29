// server/services/kindeService.ts
import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';

interface KindeJWTPayload {
  sub: string; // User ID
  email: string;
  given_name?: string;
  family_name?: string;
  aud: string[];
  exp: number;
  iat: number;
  iss: string;
  permissions?: string[];
  org_roles?: { [key: string]: string[] };
}

export class KindeService {
  private static jwksClient = new JwksClient({
    jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
    cache: true,
    cacheMaxAge: 24 * 60 * 60 * 1000, // 24 hours
    rateLimit: true,
    jwksRequestsPerMinute: 5
  });

  // Get signing key for JWT verification
  private static async getSigningKey(kid: string): Promise<string> {
    const key = await this.jwksClient.getSigningKey(kid);
    return key.getPublicKey();
  }

  // Get user roles from token payload
  static getRolesFromToken(decodedToken: any): string[] {
    if (!decodedToken.org_roles) return [];
    
    // Flatten all roles from all organizations
    const roles = Object.values(decodedToken.org_roles)
      .flat()
      .filter((role): role is string => typeof role === 'string');
    
    return [...new Set(roles)]; // Remove duplicates
  }

  // Get user permissions from token payload
  static getPermissionsFromToken(decodedToken: any): string[] {
    return decodedToken.permissions || [];
  }

  // Verify and decode Kinde JWT token
  static async verifyToken(token: string): Promise<KindeJWTPayload | null> {
    try {
      // Decode header to get key ID
      const decodedHeader = jwt.decode(token, { complete: true });
      if (!decodedHeader || !decodedHeader.header.kid) {
        throw new Error('Invalid token header');
      }

      // First, decode the token without verification to see what's inside
      const decodedPayload = jwt.decode(token) as any;
      console.log('JWT Token Debug Info:');
      console.log('Audience (aud):', decodedPayload?.aud);
      console.log('Issuer (iss):', decodedPayload?.iss);
      console.log('Subject (sub):', decodedPayload?.sub);
      console.log('Roles:', this.getRolesFromToken(decodedPayload));
      console.log('Permissions:', this.getPermissionsFromToken(decodedPayload));
      console.log('Expected CLIENT_ID:', process.env.KINDE_CLIENT_ID);
      console.log('Expected ISSUER_URL:', process.env.KINDE_ISSUER_URL);

      // Get public key for verification
      const signingKey = await this.getSigningKey(decodedHeader.header.kid);

      // Verify and decode token with more flexible options
      const verifyOptions: any = {
        issuer: process.env.KINDE_ISSUER_URL,
      };

      // Only add audience verification if KINDE_CLIENT_ID is set
      if (process.env.KINDE_CLIENT_ID) {
        verifyOptions.audience = process.env.KINDE_CLIENT_ID;
      }

      const decoded = jwt.verify(token, signingKey, verifyOptions) as unknown as KindeJWTPayload;

      return decoded;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  // Extract token from various sources
  static extractToken(authHeader?: string, cookies?: string): string | null {
    // Try Authorization header first
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Try cookies (common for browser requests)
    if (cookies) {
      const tokenCookie = cookies
        .split(';')
        .find(cookie => cookie.trim().startsWith('kinde_token='));
      
      if (tokenCookie) {
        return tokenCookie.split('=')[1];
      }

      // Also check for access_token cookie
      const accessTokenCookie = cookies
        .split(';')
        .find(cookie => cookie.trim().startsWith('access_token='));
      
      if (accessTokenCookie) {
        return accessTokenCookie.split('=')[1];
      }
    }

    return null;
  }
}