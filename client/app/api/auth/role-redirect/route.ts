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

    // Get permissions from Kinde
    const permissionsData = await getPermissions();
    const permissions = permissionsData?.permissions || [];
    
    // Map permissions to application role
    const role = permissions.includes('is_admin') ? 'admin-arats' : 'arats-user';

    // Define redirect paths based on role
    const redirectPaths = {
      'arats-user': '/user/dashboard',
      'admin-arats': '/admin/dashboard'
    };

    return NextResponse.json({ redirectPath: redirectPaths[role] });
  } catch (error) {
    console.error('Error in /api/auth/role-redirect:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 