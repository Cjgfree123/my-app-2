import React, { Component } from 'react'
import { Menu } from 'antd'
import { connect } from 'dva'
import { menuList } from './menuList';

import { NavLink } from 'dva/router'
import './index.less';

const SubMenu = Menu.SubMenu;

class SideMenu extends Component {
    
    renderMenu = data => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item title={item.title} key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
            );
        });
    };

    render() {
        return (
            <div id="side-menu">
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[]}
                    defaultOpenKeys={[]}
                    mode="inline"
                >
                   {this.renderMenu(menuList)}
                </Menu>
            </div>
        )
    }
}

export default connect()(SideMenu)