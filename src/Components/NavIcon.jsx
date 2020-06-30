import React from 'react';

class NavIcon extends React.Component {
constructor(props) {
    super(props);

    this.state = {
    };
}

    render() {
        return (
        <li className="nav-item">
            {this.props.icon}
        </li>
        );
    }
}

export default NavIcon;