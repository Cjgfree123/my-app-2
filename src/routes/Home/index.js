import React, { Component } from 'react';
import { connect } from 'dva';
import './index.less';

class Home extends Component {
    componentDidMount() {
        let { dispatch } = this.props;
        dispatch({
            type: 'user/getUserName',
            payload: {}
        });
        // console.log(this.props.user.name);
    }
    render() {
        return (
            <div id="home">
                我是主体内容
            </div>
        )
    }
}

export default connect(({ user }) => {
    return user;
})(Home);