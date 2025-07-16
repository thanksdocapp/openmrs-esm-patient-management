import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAssignedExtensions, useConfig, useSession } from '@openmrs/esm-framework';
import { type DashboardConfig } from './types/index';
import { type ConfigSchema } from './config-schema';

export function DefaultDashboardRedirect() {
  const assignedExtensions = useAssignedExtensions('homepage-dashboard-slot');
  const { defaultDashboardPerRole } = useConfig<ConfigSchema>();
  const session = useSession();
  const roles = session?.user?.roles;

  const preferredDashboards = ['appointments', 'laboratory', 'patient-lists'];

  const ungroupedDashboards = assignedExtensions.map((e) => e.meta).filter((e) => Object.keys(e).length) || [];
  const dashboards = ungroupedDashboards as Array<DashboardConfig>;

  // Get the dashboard name from role config
  const roleBasedDefault = roles
    .map((role) => defaultDashboardPerRole?.[role.display])
    .find((dashboardName) => dashboards.some((d) => d.name === dashboardName));

  // If no valid role-based dashboard, fall back to preferred list
  const fallbackDefault = preferredDashboards.find((name) =>
    dashboards.some((d) => d.name === name)
  );

  // Final default: role-based OR preferred OR just use first available
  const defaultDashboard = roleBasedDefault || fallbackDefault || dashboards[0]?.name;

  if (!defaultDashboard) {
    return <div>No dashboards available</div>;
  }

  return <Navigate to={`/home/${defaultDashboard}`} />;
}
