export const menuList = [
    {
        title: '首页',
        key: '/home',
    },
    {
        title: '商品管理',
        key: '/product',
        children: [
            {
                title:'商品买入',
                key:'/product/saleIn'
            },
            {
                title:'商品售出',
                key:'/product/saleOut'
            },
        ]
    },
    {
        title:'用户管理',
        key:'/user',
    } 
];