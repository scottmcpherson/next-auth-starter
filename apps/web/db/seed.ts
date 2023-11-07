const { db } = require('./index')
const {
  permissions: permissionsModel,
  roles: rolesModel,
  rolesPermissions: rolesPermissionsModel,
} = require('./schema')

const permissions = [
  { name: 'USE_CONNECTIONS', permissionId: 1 },
  { name: 'MANAGE_BILLING', permissionId: 2 },
  { name: 'MANAGE_CONNECTIONS', permissionId: 3 },
  { name: 'MANAGE_USERS', permissionId: 4 },
  { name: 'MANAGE_AI_CONFIG', permissionId: 5 },
]

const roles = [
  { name: 'ADMIN', roleId: 1 },
  { name: 'MANAGER', roleId: 2 },
  { name: 'EMPLOYEE', roleId: 3 },
]

const rolesPermissions = [
  { roleId: 1, permissionId: 1 }, // Admin can use connections
  { roleId: 1, permissionId: 2 }, // Admin can manage billing
  { roleId: 1, permissionId: 3 }, // Admin can manage connections
  { roleId: 1, permissionId: 4 }, // Admin can manage users
  { roleId: 1, permissionId: 5 }, // Admin can manage AI config
  { roleId: 2, permissionId: 1 }, // MANAGER can use connections
  { roleId: 2, permissionId: 3 }, // MANAGER can manage connections
  { roleId: 2, permissionId: 4 }, // MANAGER can manage users
  { roleId: 3, permissionId: 1 }, // EMPLOYEE can use connections
]

async function mainSeedDb() {
  // Create permissions and on conflict do nothing
  for (let i = 0; i < permissions.length; i++) {
    await db
      .insert(permissionsModel)
      .values({
        name: permissions[i].name,
        permissionId: permissions[i].permissionId,
      })
      .onConflictDoNothing()
  }

  // Create roles and on conflict do nothing
  for (let i = 0; i < roles.length; i++) {
    await db
      .insert(rolesModel)
      .values({
        name: roles[i].name,
        roleId: roles[i].roleId,
      })
      .onConflictDoNothing()
  }

  // Create rolesPermissions and on conflict do nothing
  for (let i = 0; i < rolesPermissions.length; i++) {
    await db
      .insert(rolesPermissionsModel)
      .values({
        roleId: rolesPermissions[i].roleId,
        permissionId: rolesPermissions[i].permissionId,
      })
      .onConflictDoNothing()
  }
}

mainSeedDb().catch((e) => {
  console.error(e)
  process.exit(1)
})
