"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { UserRole } from "@/lib/auth/roles";

const AdminRoleContext = createContext<UserRole | null>(null);

export function AdminRoleProvider({ role, children }: { role: UserRole; children: ReactNode }) {
	return <AdminRoleContext.Provider value={role}>{children}</AdminRoleContext.Provider>;
}

export function useAdminRole(): UserRole {
	const role = useContext(AdminRoleContext);
 if (!role) throw new Error("useAdminRole precisa estar dentro de AdminRoleProvider");
	return role;
}