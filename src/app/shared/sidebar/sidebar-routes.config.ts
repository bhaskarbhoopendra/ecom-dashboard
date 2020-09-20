import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    // {
    //     path: '', title: 'Pages', icon: 'ft-square', class: 'has-sub', badge: '1', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    //     submenu: [
    //         { path: '/login', title: 'Login', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },

    //     ]
    // },
    // {
    //     path: '', title: 'Settings', icon: 'ft-home', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
    //         { path: '/settings/deliveryoptions', title: 'Delivery Options', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         // { path: '/dashboard/dashboard2', title: 'Dashboard2', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //     ]
    // },

    {
        path: '/dashboard', title: 'Dashboard', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/products', title: 'Products', icon: 'ft-bar-chart', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/categories', title: 'Categories', icon: 'ft-menu', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/sub-category',
        title: 'Sub categories',
        icon: 'ft-menu',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
    },
    {
        path: '/banner', title: 'Banner', icon: 'ft-menu', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/deals', title: 'Deals', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/coupons', title: 'Coupons', icon: 'ft-file-minus', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    // {
    //     path: '/locations',
    //     title: 'Locations',
    //     icon: 'ft-navigation',
    //     class: '',
    //     badge: '',
    //     badgeClass: '',
    //     isExternalLink: false,
    //     submenu: []
    // },
    {
        path: '/orders', title: 'Orders', icon: 'ft-check-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/users', title: 'Users', icon: 'ft-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/notifications',
        title: 'Notifications',
        icon: 'ft-user',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
    },
    {
        path: '/delivery-boy',
        title: 'Delivery Boys',
        icon: 'ft-user',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
    },
    {
        path: '/settings/chat',
        title: 'Chat',
        icon: 'ft-clock',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
    },
    {
        path: '',
        title: 'Settings',
        icon: 'ft-settings',
        class: 'has-sub',
        badge: '',
        badgeClass: 'badge badge-pill badge-success float-right mr-1 mt-1',
        isExternalLink: false,
        submenu: [
            // {
            //     path: '/settings/deliveryoptions',
            //     title: 'Delivery Options',
            //     icon: 'ft-map-pin',
            //     class: '',
            //     badge: '',
            //     badgeClass: '',
            //     isExternalLink: false,
            //     submenu: []
            // },
            {
                path: '/settings/workinghours',
                title: 'Working Hours',
                icon: 'ft-clock',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: []
            },
            {
                path: '/settings/delivery-settings',
                title: 'Delivery & Tax settings',
                icon: 'ft-map-pin',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: []
            },
            // {
            //     path: '/settings/profile',  
            //     title: 'Profile',
            //     icon: 'ft-user',
            //     class: '',
            //     badge: '',
            //     badgeClass: '',
            //     isExternalLink: false,
            //     submenu: []
            // },

            {
                path: '/settings/currency',
                title: 'Currency & Languages',
                icon: 'ft-map-pin',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: []
            },
            // {
            //     path: '/settings/currency-management',
            //     title: 'Currency-Management',
            //     icon: 'ft-map-pin',
            //     class: '',
            //     badge: '',
            //     badgeClass: '',
            //     isExternalLink: false,
            //     submenu: []
            // },
            {
                path: '/settings/business-info',
                title: 'Business-info',
                icon: 'fa fa-info',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: []
            }
        ]
    },

    // {
    //     path: '/full-layout', title: 'Full Layout', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
    // {
    //     path: '/content-layout', title: 'Content Layout', icon: 'ft-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
    // {
    //     path: '', title: 'Menu Levels', icon: 'ft-align-left', class: 'has-sub', badge: '1', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    //     submenu: [
    //         { path: 'javascript:;', title: 'Second Level', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    //         {
    //             path: '', title: 'Second Level Child', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    //             submenu: [
    //                 { path: 'javascript:;', title: 'Third Level 1.1', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    //                 { path: 'javascript:;', title: 'Third Level 1.2', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    //             ]
    //         },
    //     ]
    // },
    // {
    //     path: '/changelog', title: 'ChangeLog', icon: 'ft-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
    // { path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', title: 'Documentation', icon: 'ft-folder', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    // { path: 'https://pixinvent.ticksy.com/', title: 'Support', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },

];
