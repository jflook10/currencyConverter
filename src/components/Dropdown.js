import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
    state = {
        isOpen: false,
        selected: null,
    }

    handleClick = (e) => {
        const { isOpen } = this.state
        console.log(e)
        this.setState({
            isOpen: !isOpen
        })
    }

    handleLiClick = val => {
        const { isOpen } = this.state
        console.log(val)
        this.setState({
            isOpen: !isOpen,
            selected: val,
        })
    }

    renderList = () => {
        return(
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
            </ul>
        )
    }

    renderButton = () => {
        return(
            <button onClick={this.handleClick}>Test</button>
        )
    }


    render() {
        const { isOpen } = this.state
        return (
            <div>
            { isOpen ? this.renderList() : this.renderButton() }
            </div>
            )
    }
}

export default Dropdown