import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Table, Modal, Form, Input, Icon, InputNumber, Pagination } from 'antd';
import './index.less';

const formItemLayout = {
    labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
    },
};

class HomeConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.type = 0;// 0 新增    1 编辑
        this.record = {};
    }

    componentDidMount() {
        let { dispatch } = this.props;
        dispatch({
            type: 'user/getUserName',
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleOk();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
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
           
        });
    }

    showModal = (type, record = {}) => {
        this.setState({
            visible: true
        });
        this.type = type;
        this.record = record;
    }

    handleOk = () => {
        this.setState({
            visible: false
        });

    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        });
    }

    onPageChange=(page) =>{
        this.props.dispatch({
            type:'user/setPage',
            payload:{
                page,
                size:2,
            }
        });
        this.props.dispatch({
            type:'user/getTableList',
        });
    }

    render() {
        console.log(this)
        let that = this;
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
        }, {
            title: '操作',
            key: 'operation',
            render(text, record) {
                return (
                    <div>
                        <span onClick={() => that.showModal(1, record)} className="edit-btn">
                            编辑
                        </span>
                        <span onClick={() => that.showModal(0)} className="add-btn">
                            新增
                        </span>
                    </div>

                );
            }
        }];
        let { user: { name, tableData }, loading } = this.props;
        let { type, record } = this;
        const isLoading = loading.effects['user/getTableList'];
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="home">
                <Button onClick={this.modify}>修改名字</Button>
                姓名:{name}
                <hr />
                <Button onClick={this.getTableData}>表格数据</Button>
                <hr />

                <Table
                    className="table-style"
                    dataSource={tableData}
                    columns={columns}
                    loading={isLoading}
                    rowKey={record => record._id}
                    pagination={false}
                />

                <Pagination defaultCurrent={1} total={50} onChange={this.onPageChange} className="page-style"/>

                <Modal title="第一个 Modal" visible={this.state.visible}
                    onOk={this.handleSubmit} onCancel={this.handleCancel}
                    cancelText="取消" okText="提交"
                >
                    <Form onSubmit={this.handleSubmit} className="edit-form">
                        <Form.Item
                            {...formItemLayout}
                            label="用户名"
                        >
                            {getFieldDecorator('name', {
                                initialValue: type === 0 ? '' : record.name,
                                rules: [{
                                    required: true, message: 'Please input your userName!',
                                }],
                            })(
                                <Input style={{ width: 250 }} placeholder="请输入姓名" />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="年龄"
                        >
                            {getFieldDecorator('age', {
                                initialValue: type === 0 ? '' : record.age,
                                rules: [{
                                    required: true, message: 'Please input your age!',
                                }],
                            })(
                                <InputNumber style={{ width: 250 }} min={1} max={120} placeholder="请输入年龄" />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="住址"
                        >
                            {getFieldDecorator('address', {
                                initialValue: type === 0 ? '' : record.address,
                                rules: [{
                                    required: true, message: 'Please input your address!',
                                }],
                            })(
                                <Input style={{ width: 250 }} placeholder="请输入住址" />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const Home = Form.create({ name: 'normal_login' })(HomeConfig);
export default connect(({ user, loading }) => ({ user, loading }))(Home);