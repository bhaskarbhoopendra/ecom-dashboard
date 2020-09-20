import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../auth/auth-guard.service';

//Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [


    {
        path: 'changelog',
        loadChildren: () => import('../../changelog/changelog.module').then(m => m.ChangeLogModule)
    },
    {
        path: 'settings',
        loadChildren: () => import('../../settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path: 'full-layout',
        loadChildren: () => import('../../pages/full-layout-page/full-pages.module').then(m => m.FullPagesModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'products',
        loadChildren: () => import('../../products/products.module').then(m => m.ProductsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'addproduct',
        loadChildren: () => import('../../pages/addproduct/addproduct.module').then(m => m.AddproductModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'sub-category',
        loadChildren: () => import('../../sub-category/sub-category.module').then(module => module.SubCategoryModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'editproduct/:id',
        loadChildren: () => import('../../pages/editproduct/editproduct.module').then(m => m.EditproductModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'notifications',
        loadChildren: () => import('../../Notifications/notifications.module').then(m => m.NotificationsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'showproduct/:id',
        loadChildren: () => import('../../pages/showproduct/showproduct.module').then(m => m.ShowproductModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'categories',
        loadChildren: () => import('../../categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'banner',
        loadChildren: () => import('../../banner/banner.module').then(module => module.BannerModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'delivery-boy',
        loadChildren: () => import('../../delivery-boy/delivery-boy.module').then(m => m.DeliveryBoyModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'editcategory/:id',
        loadChildren: () => import('../../pages/editcategory/editcategory.module').then(m => m.EditcategoryModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'addcategory',
        loadChildren: () => import('../../pages/addcategory/addcategory.module').then(m => m.AddcategoryModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'viewcategory/:id',
        loadChildren: () => import('../../pages/viewcategory/viewcategory.module').then(m => m.ViewcategoryModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'deals',
        loadChildren: () => import('../../deals/deals.module').then(m => m.DealsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'coupons',
        loadChildren: () => import('../../coupons/coupons.module').then(m => m.CouponsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'editdeal/:id',
        loadChildren: () => import('../../pages/editdeal/editdeal.module').then(m => m.EditdealModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'viewdeal/:id',
        loadChildren: () => import('../../pages/viewdeal/viewdeal.module').then(m => m.ViewdealModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'adddeal',
        loadChildren: () => import('../../pages/adddeal/adddeal.module').then(m => m.AdddealModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'addcoupon',
        loadChildren: () => import('../../pages/addcoupon/addcoupon.module').then(m => m.AddcouponModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'editcoupon/:id',
        loadChildren: () => import('../../pages/editcoupon/editcoupon.module').then(m => m.EditcouponModule),
        canActivate: [AuthGuard]
    },
    // {
    //     path: 'locations',
    //     loadChildren: () => import('../../locations/locations.module').then(m => m.LocationsModule),
    //     canActivate: [AuthGuard]
    // },
    // {
    //     path: 'addlocation',
    //     loadChildren: () => import('../../pages/addlocation/addlocation.module').then(m => m.AddlocationModule),
    //     canActivate: [AuthGuard]
    // },
    // {
    //     path: 'editlocation/:id',
    //     loadChildren: () => import('../../pages/editlocation/editlocation.module').then(m => m.EditlocationModule),
    //     canActivate: [AuthGuard]
    // },
    {
        path: 'orders',
        loadChildren: () => import('../../orders/Orders.module').then(m => m.OrdersModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: () => import('../../users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'vieworder/:id',
        loadChildren: () => import('../../pages/vieworder/vieworder.module').then(m => m.VieworderModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'chat',
        loadChildren: () => import('../../settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard]
    },
];
