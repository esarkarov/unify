import { relations } from 'drizzle-orm';
import { boolean, index, pgEnum, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

import { timestamps } from '@/shared/db/schema/common.schema';

export const roleEnum = pgEnum('role', ['student', 'teacher', 'admin']);

export const user = pgTable('user', {
  email: text('email').notNull(),
  emailVerified: boolean('email_verified').notNull(),
  id: text('id').primaryKey(),
  image: text('image'),
  imageCldPubId: text('image_cld_pub_id'),
  name: text('name').notNull(),
  role: roleEnum('role').notNull().default('student'),
  ...timestamps,
});

export const session = pgTable(
  'session',
  {
    expiresAt: timestamp('expires_at').notNull(),
    id: text('id').primaryKey(),
    ipAddress: text('ip_address'),
    token: text('token').notNull(),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    ...timestamps,
  },
  (table) => ({
    tokenUnique: uniqueIndex('session_token_unique').on(table.token),
    userIdIdx: index('session_user_id_idx').on(table.userId),
  })
);

export const account = pgTable(
  'account',
  {
    accessToken: text('access_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    accountId: text('account_id').notNull(),
    id: text('id').primaryKey(),
    idToken: text('id_token'),
    password: text('password'),
    providerId: text('provider_id').notNull(),
    refreshToken: text('refresh_token'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    ...timestamps,
  },
  (table) => ({
    accountUnique: uniqueIndex('account_provider_account_unique').on(table.providerId, table.accountId),
    userIdIdx: index('account_user_id_idx').on(table.userId),
  })
);

export const verification = pgTable(
  'verification',
  {
    expiresAt: timestamp('expires_at').notNull(),
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    ...timestamps,
  },
  (table) => ({
    identifierIdx: index('verification_identifier_idx').on(table.identifier),
  })
);

export const usersRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
}));

export const sessionsRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountsRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;

export type NewSession = typeof session.$inferInsert;
export type NewUser = typeof user.$inferInsert;

export type NewVerification = typeof verification.$inferInsert;
export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
export type Verification = typeof verification.$inferSelect;
