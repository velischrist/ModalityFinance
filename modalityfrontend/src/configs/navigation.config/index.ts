import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/companies/CompanyList',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'lps',
        path: 'lps',
        title: 'My LPs',
        translateKey: 'nav.lps',
        icon: 'lps',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },

    {
        key: 'groupMenu',
        path: '',
        title: 'Performance',
        translateKey: 'nav.groupMenu.groupMenu',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        subMenu: [
            {
                key: 'groupMenu.reporting',
                path: '/reporting',
                title: 'Reporting',
                translateKey: 'nav.groupMenu.reporting',
                icon: 'reporting',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'groupMenu.automations',
                path: '/automations',
                title: 'Automations',
                translateKey: 'nav.groupMenu.automations',
                icon: 'automations',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'groupMenu2',
        path: '',
        title: 'Intelligence',
        translateKey: 'nav.groupMenu2.groupMenu',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        subMenu: [
            {
                key: 'groupMenu.virtualanalyst',
                path: '/virtualanalyst',
                title: 'Virtual Analyst',
                translateKey: 'nav.groupMenu2.virtualanalyst',
                icon: 'virtualanalyst',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'groupMenu3',
        path: '',
        title: 'Settings',
        translateKey: 'nav.groupMenu3.groupMenu',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        subMenu: [
            {
                key: 'groupMenu3.collapse',
                path: '',
                title: 'Settings',
                translateKey: 'nav.groupMenu3.collapse.collapse',
                icon: 'accountsettings',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'groupMenu3.collapse.organizationsettings',
                        path: '/organizationsettings',
                        title: 'Organization Settings',
                        translateKey:
                            'nav.groupMenu3.collapse.organizationsettings',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu3.collapse.accountsettings',
                        path: '/accountsettings',
                        title: 'Account Settings',
                        translateKey: 'nav.groupMenu3.collapse.accountsettings',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]

export default navigationConfig
