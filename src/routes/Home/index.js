import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import './index.less';

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}];

class Home extends Component {

    componentDidMount() {
        let { dispatch } = this.props;
        dispatch({
            type: 'user/getUserName',
        });
    }

    modify = () => {
        let { dispatch } = this.props;
        dispatch({
            type: 'user/updateName',
            payload: "新名字",
        });
    }

    getTableData = () => {
        let { dispatch } = this.props;
        dispatch({
            type: 'user/getTableList',
            payload: "新名字",
        });
    }

    render() {
        let { user: { name, tableData }, loading } = this.props;
        console.log(this.props)
        const isLoading = loading.effects['user/getTableList'];

        return (
            <div id="home">
                <Button onClick={this.modify}>修改名字</Button>
                姓名:{name}
                <hr />
                <Button onClick={this.getTableData}>表格数据</Button>
                <hr />

                <Table dataSource={tableData} columns={columns} loading={isLoading} />
            </div>
        )
    }
}

export default connect(({ user, loading }) => ({ user, loading }))(Home);