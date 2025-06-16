export const ROLES = {
  FARMER: 'farmer',
  BUYER: 'buyer',
  ADMIN: 'admin',
} as const;

export const ROLE_PATHS = {
  [ROLES.FARMER]: '/farmer',
  [ROLES.BUYER]: '/buyer',
  [ROLES.ADMIN]: '/admin',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export const isValidRole = (role: string): role is UserRole => {
  return Object.values(ROLES).includes(role as UserRole);
};