import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import appsRoute from './appsRoute'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/companies/CompanyList')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'lps',
        path: '/lps',
        component: lazy(() => import('@/views/lps/LPlist')),
        authority: [],
    },
    {
        key: 'reporting',
        path: '/reporting',
        component: lazy(() => import('@/views/demo/reporting')),
        authority: [],
    },
    {
        key: 'automations',
        path: '/automations',
        component: lazy(() => import('@/views/demo/automations')),
        authority: [],
    },
    {
        key: 'mapping',
        path: '/mapping',
        component: lazy(() => import('@/views/documents/DocumentMapping')),
        authority: [],
    },
    {
        key: 'VirtualAnalyst',
        path: '/VirtualAnalyst',
        component: lazy(() => import('@/views/virtualanalyst')),
        authority: [],
    },
    {
        key: 'AccountSettings',
        path: '/AccountSettings',
        component: lazy(() => import('@/views/demo/accountsettings')),
        authority: [],
    },
    {
        key: 'OrganizationSettings',
        path: '/OrganizationSettings',
        component: lazy(
            () => import('@/views/organizationsettings/organizationsettings'),
        ),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView1'),
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },
    ...appsRoute,
]
