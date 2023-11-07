import { relations } from 'drizzle-orm'
import {
  AnyPgColumn,
  boolean,
  foreignKey,
  integer,
  json,
  pgEnum,
  pgSchema,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    userId: text('user_id').primaryKey(),
    email: varchar('email', { length: 320 }),
    photoURL: text('photo_url'),
    name: text('name'),
    isActive: boolean('is_active').default(true),
    preferences: json('preferences'),
    stripeCustomerId: text('stripe_customer_id'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    emailIndex: uniqueIndex('users_email_idx').on(table.email),
    stripeCustomerIdIndex: uniqueIndex('users_stripe_customer_id_idx').on(
      table.stripeCustomerId
    ),
  })
)

export const organizationTypeEnum = pgEnum('organization_type', [
  'personal',
  'organization',
])

export const organizations = pgTable('organizations', {
  organizationId: serial('organization_id').primaryKey(),
  name: text('name'),
  organizationType: organizationTypeEnum('organization_type'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('created_at').defaultNow(),
})

export const usersRelations = relations(users, ({ many, one }) => ({
  usersToOrganizations: many(usersToOrganizations),
  usersRoles: many(usersRoles),
  subscription: one(subscriptions, {
    fields: [users.userId],
    references: [subscriptions.userId],
  }),
  chatTopics: many(chatTopics),
}))

export const usersToOrganizations = pgTable(
  'users_to_organizations',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.userId),
    organizationId: integer('organization_id')
      .notNull()
      .references(() => organizations.organizationId),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.organizationId),
  })
)

export const organizationsRelations = relations(organizations, ({ many }) => ({
  usersToOrganizations: many(usersToOrganizations),
}))

export const usersToOrganizationsRelations = relations(
  usersToOrganizations,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [usersToOrganizations.organizationId],
      references: [organizations.organizationId],
    }),
    user: one(users, {
      fields: [usersToOrganizations.userId],
      references: [users.userId],
    }),
  })
)

export const roles = pgTable(
  'roles',
  {
    roleId: serial('role_id').primaryKey(),
    name: text('name'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    nameIndex: uniqueIndex('roles_name_idx').on(table.name),
  })
)

export const permissions = pgTable(
  'permissions',
  {
    permissionId: serial('permission_id').primaryKey(),
    name: text('name'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    nameIndex: uniqueIndex('permissions_name_idx').on(table.name),
  })
)

export const usersRoles = pgTable(
  'users_roles',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.userId),
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.roleId),
    organizationId: integer('organization_id')
      .notNull()
      .references(() => organizations.organizationId),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.roleId, table.organizationId),
  })
)

export const rolesPermissions = pgTable(
  'roles_permissions',
  {
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.roleId),
    permissionId: integer('permission_id')
      .notNull()
      .references(() => permissions.permissionId),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    pk: primaryKey(table.roleId, table.permissionId),
  })
)

export const rolesRelations = relations(roles, ({ many }) => ({
  permissions: many(rolesPermissions),
  users: many(usersRoles),
}))

export const permissionsRelations = relations(permissions, ({ many }) => ({
  roles: many(rolesPermissions),
}))

export const usersRolesRelations = relations(usersRoles, ({ one }) => ({
  user: one(users, {
    fields: [usersRoles.userId],
    references: [users.userId],
  }),
  role: one(roles, {
    fields: [usersRoles.roleId],
    references: [roles.roleId],
  }),
  organization: one(organizations, {
    fields: [usersRoles.organizationId],
    references: [organizations.organizationId],
  }),
}))

export const rolesPermissionsRelations = relations(
  rolesPermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolesPermissions.roleId],
      references: [roles.roleId],
    }),
    permission: one(permissions, {
      fields: [rolesPermissions.permissionId],
      references: [permissions.permissionId],
    }),
  })
)

export const subscriptions = pgTable(
  'subscriptions',
  {
    subscriptionId: text('subscription_id').primaryKey(),
    status: varchar('status', { length: 100 }),
    metadata: json('metadata'),
    priceId: varchar('price_id', { length: 100 }),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
    currentPeriodEnd: timestamp('current_period_end'),
    userId: varchar('user_id', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    userIdIndex: uniqueIndex('roles_user_id_idx').on(table.userId),
  })
)

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.userId],
  }),
}))

export const prices = pgTable(
  'prices',
  {
    priceId: text('price_id').primaryKey(),
    unitAmount: text('unit_amount'),
    currency: varchar('currency', { length: 10 }),
    interval: varchar('interval', { length: 100 }),
    active: boolean('active').default(true),
    productId: varchar('product_id', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    productActiveIndex: uniqueIndex('prices_product_active_idx').on(
      table.productId,
      table.active
    ),
  })
)

export const pricesRelations = relations(prices, ({ one }) => ({
  product: one(products, {
    fields: [prices.productId],
    references: [products.productId],
  }),
}))

export const products = pgTable(
  'products',
  {
    productId: text('product_id').primaryKey(),
    name: varchar('name', { length: 255 }),
    description: text('description'),
    active: boolean('active').default(true),
    tier: varchar('tier', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    activeIndex: uniqueIndex('products_active_idx').on(table.active),
  })
)

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(prices),
}))

export const chatTopics = pgTable('chat_topics', {
  chatTopicId: serial('chat_topic_id').primaryKey(),
  title: text('title'),
  userId: text('user_id').references(() => users.userId),
  createdAt: timestamp('created_at').defaultNow(),
})

export const chatTopicsRelations = relations(chatTopics, ({ one, many }) => ({
  chatMessages: many(chatMessages),
  user: one(users, {
    fields: [chatTopics.userId],
    references: [users.userId],
  }),
}))

export const chatMessages = pgTable('chat_messages', {
  tabContentId: serial('tab_content_id').primaryKey(),
  content: text('content'),
  chatTopicId: integer('chat_topic_id'),
})

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  chatTopic: one(chatTopics, {
    fields: [chatMessages.chatTopicId],
    references: [chatTopics.chatTopicId],
  }),
}))
