import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { db } from '@/shared/db';
import * as schema from '@/shared/db/schema/auth.schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  trustedOrigins: [process.env.FRONTEND_URL!],
  user: {
    additionalFields: {
      imageCldPubId: {
        input: true,
        required: false,
        type: 'string',
      },
      role: {
        defaultValue: 'student',
        input: true,
        required: true,
        type: 'string',
      },
    },
  },
});
