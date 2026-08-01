/**
 * Membership roles inside a company (tenant). Ordered from most to least
 * privileged. Roles are always assigned server-side (see auth.service /
 * companies.service) - a client can never set or escalate its own role.
 */
export const ROLES = ["OWNER", "ADMIN", "STAFF"] as const;
export type Role = (typeof ROLES)[number];

const ROLE_RANK: Record<Role, number> = {
  OWNER: 3,
  ADMIN: 2,
  STAFF: 1,
};

/** True when `role` has at least the privilege level of `required`. */
export function roleAtLeast(role: Role, required: Role): boolean {
  return ROLE_RANK[role] >= ROLE_RANK[required];
}
