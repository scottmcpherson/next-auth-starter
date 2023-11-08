import { firebaseAdmin } from '@/common/utils/firebase-admin'
import { getFirstItem } from '@/common/utils/helpers'
import { db } from '@/db'
import { organizations, roles, users, usersRoles } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

enum RoleType {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

export async function POST(req: Request) {
  try {
    const token = headers().get('Authorization')?.split('Bearer ')[1] || ''
    const authenticatedUser = await firebaseAdmin.auth().verifyIdToken(token)
    const { name, email, picture, user_id: userId } = authenticatedUser
    if (!userId) {
      return new Response(null, {
        status: 401,
        statusText: 'Unauthorized',
      })
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.userId, userId),
    })

    let returnUser

    if (!existingUser) {
      const adminRole = await db.query.roles.findFirst({
        where: eq(roles.name, RoleType.ADMIN),
      })
      if (!adminRole) {
        return new Response(null, {
          status: 400,
          statusText:
            'An error occurred while creating the user. Roles not found',
        })
      }
      const [organization] = await db
        .insert(organizations)
        .values({
          name: 'Personal',
          organizationType: 'personal',
        })
        .returning()

      const [newUser] = await db
        .insert(users)
        .values({
          userId: userId,
          name: name,
          email,
          photoURL: picture,
          isActive: true,
        })
        .returning()

      await db.insert(usersRoles).values({
        userId: newUser.userId,
        roleId: adminRole.roleId,
        organizationId: organization.organizationId,
      })

      await firebaseAdmin.auth().setCustomUserClaims(userId, {
        role: RoleType.ADMIN,
        organizationId: organization.organizationId,
      })
      returnUser = newUser
    } else {
      const { rows: userRoles } = await db.execute(sql`
        SELECT ur.organization_id
        FROM roles r
        INNER JOIN users_roles ur ON r.role_id = ur.role_id
        WHERE
          r.name::text = ${RoleType.ADMIN}
          AND ur.user_id = ${userId}
        `)
      const organizationId = getFirstItem(userRoles)?.organization_id
      if (!organizationId) {
        return new Response(null, {
          status: 400,
          statusText:
            'An error occurred while creating the user. Organization not found',
        })
      }
      const [updatedUser] = await db
        .update(users)
        .set({
          name: name,
          email,
          photoURL: picture,
        })
        .where(eq(users.userId, userId))
        .returning()

      await firebaseAdmin.auth().setCustomUserClaims(userId, {
        role: RoleType.ADMIN,
        organizationId,
      })
      returnUser = updatedUser
    }
    return NextResponse.json(returnUser)
  } catch (error: any) {
    console.error('Error creating user:', error)
    return new Response(null, {
      status: 500,
      statusText: 'Error creating user',
    })
  }
}
