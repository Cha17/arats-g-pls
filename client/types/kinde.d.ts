import { User } from '@kinde-oss/kinde-auth-nextjs/dist/types';

declare module '@kinde-oss/kinde-auth-nextjs/server' {
  interface GetUserReturnType extends User {
    id: string;
    given_name?: string;
    family_name?: string;
    email?: string;
    roles?: string[];
    permissions?: string[];
    org_roles?: { [key: string]: string[] };
  }

  interface KindeServerSession {
    getUser: () => Promise<GetUserReturnType>;
  }
}

export {}; 