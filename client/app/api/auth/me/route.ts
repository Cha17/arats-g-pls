import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { GetUserReturnType } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET() {
  try {
    const { getUser, isAuthenticated, getPermissions } = getKindeServerSession();
    
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const kindeUser = await getUser() as GetUserReturnType;
    if (!kindeUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Debug logging
    console.log('Kinde User Data:', {
      id: kindeUser.id,
      email: kindeUser.email,
      roles: kindeUser.roles,
      org_roles: kindeUser.org_roles
    });

    // Get permissions from Kinde
    const permissionsData = await getPermissions();
    console.log('Kinde Permissions:', permissionsData);
    
    // Map permissions to application role
    const permissions = permissionsData?.permissions || [];
    const role = permissions.includes('is_admin') ? 'admin-arats' : 'arats-user';
    console.log('Mapped Application Role:', role);

    const user = {
      id: kindeUser.id,
      email: kindeUser.email,
      firstName: kindeUser.given_name,
      lastName: kindeUser.family_name,
      role,
      permissions
    };

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 