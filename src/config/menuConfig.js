const menuList = [
    {
        key:'sub1',
        title: '首页',
        router: '/admin/home'
    },

    {
        key:'sub2',
        title: '分销商管理',
        router: '/admin',
        children: [
            {
                key:'1',
                title: '信息管理',
                router: '/admin/charts/bar'
            }
        ]
    },

    {
        key:'sub3',
        title: '管理员管理',
        router: '/admin',
        children: [
            {
                key:'4',
                title: '信息管理',
                router: '/admin/adminInfo'
            }
        ]
    },


    {
        key:'sub4',
        title: '图表分析',
        router: '/admin/charts',
        children: [
            {
                key:'7',
                title: '柱形图',
                router: '/admin/charts/bar'
            },
            {
                key:'8',
                title: '饼图',
                router: '/admin/charts/pie'
            },
            {
                key:'9',
                title: '折线图',
                router: '/admin/charts/line'
            },
        ]
    },

    {
        key:'sub5',
        title: '销售类型',
        router: '/admin/type'
    },

    {
        key:'sub7',
        title: '权限管理',
        router: '/admin/permission'
    },
];
export default menuList;