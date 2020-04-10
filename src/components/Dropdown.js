import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

class Dropdown extends Component {
    state = {
        isOpen: false,
        selected: null,
        header: "BeeBop"
    }

    handleClick = (e) => {
        const { isOpen } = this.state
        e.preventDefault()
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
        const { currencyOptions } = this.props
        return (
          <ul>
            {currencyOptions.map((item) => (
              <li
                className="listItem"
                onClick={(item) => this.handleLiClick(item.name)}
                key={item.code}
                value={item.code}
              >{`${item.name}: ${item.symbol}`}</li>
            ))}
          </ul>
        );
    }

    renderButton = () => {
        const { isOpen } = this.state
        const { selected } = this.props
        return(
            <button onClick={this.handleClick}>{`${selected.name}: ${selected.symbol}`}
                {isOpen
                    ? <FontAwesomeIcon icon={faAngleUp} size="2x"/>
                    : <FontAwesomeIcon icon={faAngleDown} size="2x"/>
            }
            </button>
        )
    }


    render() {
        const { isOpen } = this.state
        return (
            <div>
                {this.renderButton()}
            { isOpen ? this.renderList() : null }
            </div>
            )
    }
}

Dropdown.propTypes ={
    currencyOptions: PropTypes.array.isRequired,
    selected: PropTypes.object.isRequired,
}

export default Dropdown