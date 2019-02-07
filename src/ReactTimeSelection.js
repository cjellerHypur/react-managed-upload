import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ReactTimeSelection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

class ReactTimeSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPicker: false,
            meridian: 'AM',
            value: props.value,
        };
    }

    reactTimeClickHandler = () => {
        const { showPicker } = this.state;
        const { isMilitaryTime } = this.props;
        if (showPicker) {
            return;
        }
        const currentDate = new Date();
        let currentHours = currentDate.getHours();
        let meridian = 'AM';
        if (!isMilitaryTime) {
            meridian = Math.floor(currentHours / 12) === 1 ? 'PM' : 'AM';
            currentHours %= 12;
            currentHours = currentHours === 0 ? 12 : currentHours;
        }
        this.setState({
            showPicker: true,
            currentHours,
            currentMinutes: currentDate.getMinutes(),
            meridian,
        });
    };

    valueChangeHours = (e) => {
        const { isMilitaryTime } = this.props;
        let currentHours = e.target.value.replace(/[^0-9.]/g, '');
        let meridian = 'AM';
        if (!isMilitaryTime && currentHours > 12) {
            meridian = Math.floor(currentHours / 12) === 1 ? 'PM' : 'AM';
            currentHours = 12;
        } else if (!isMilitaryTime && currentHours < 1) {
            currentHours = 1;
        } else if (isMilitaryTime && currentHours > 23) {
            currentHours = 23;
        }
        this.setState({ currentHours, meridian });
    };

    valueChangeMinutes = (e) => {
        let currentMinutes = e.target.value.replace(/[^0-9.]/g, '');
        if (currentMinutes > 59) {
            currentMinutes = 59;
        }
        this.setState({ currentMinutes });
    };

    setValueClickHandler = () => {
        let setTime = '';
        const { currentHours, currentMinutes, meridian } = this.state;
        const { isMilitaryTime, onTimeChange } = this.props;
        const timeObject = {};
        if (!isMilitaryTime) {
            setTime = `${`0${currentHours}`.slice(-2)}:${`0${currentMinutes}`.slice(
                -2,
            )} ${meridian}`;
            timeObject.hour = `0${currentHours}`.slice(-2);
            timeObject.mins = `0${currentMinutes}`.slice(-2);
            timeObject.mer = meridian;
        } else {
            setTime = `${`0${currentHours}`.slice(-2)}:${`0${currentMinutes}`.slice(-2)}`;
            timeObject.hour = `0${currentHours}`.slice(-2);
            timeObject.mins = `0${currentMinutes}`.slice(-2);
        }
        this.setState({ value: setTime, showPicker: false });
        onTimeChange(setTime, timeObject);
    };

    resetValueClickHandler = () => {
        this.setState({ value: '' });
    };

    closeClickHandler = () => {
        this.setState({ showPicker: false });
    };

    arrowClickHandler = (field, direction) => {
        const { currentHours, currentMinutes } = this.state;
        let { meridian } = this.state;
        const { isMilitaryTime } = this.props;
        if (field === 'hour' && direction === 'up') {
            if ((isMilitaryTime && currentHours < 23) || (!isMilitaryTime && currentHours < 12)) {
                this.setState({ currentHours: currentHours + 1 });
            } else if (isMilitaryTime && currentHours > 22) {
                this.setState({ currentHours: 0 });
            } else if (!isMilitaryTime && currentHours >= 12) {
                this.setState({ currentHours: 1 });
            }
        } else if (field === 'hour' && direction === 'down') {
            if ((currentHours !== 0 && currentHours !== '0') && ((!isMilitaryTime && (currentHours !== 1 && currentHours !== '1')) || isMilitaryTime)) {
                this.setState({ currentHours: currentHours - 1 });
            } else if (isMilitaryTime && (currentHours === 0 || currentHours === '0')) {
                this.setState({ currentHours: 23 });
            } else if (!isMilitaryTime && (currentHours === 1 || currentHours === '1')) {
                this.setState({ currentHours: 12 });
            }
        } else if (field === 'min' && direction === 'up') {
            if (currentMinutes < 59) {
                this.setState({ currentMinutes: currentMinutes + 1 });
            } else {
                this.setState({ currentMinutes: 0 });
            }
        } else if (field === 'min' && direction === 'down') {
            if (currentMinutes !== 0 && currentMinutes !== '0') {
                this.setState({ currentMinutes: currentMinutes - 1 });
            } else {
                this.setState({ currentMinutes: 59 });
            }
        } else if (field === 'meri' && (direction === 'down' || direction === 'up')) {
            meridian = meridian === 'AM' ? 'PM' : 'AM';
            this.setState({ meridian });
        }
    };

    renderTimepicker() {
        const { showPicker, currentHours, currentMinutes } = this.state;
        if (showPicker) {
            return (
                <div id="ReactTime-picker">
                    <svg role="presentation" focusable="false" className="ReactTime-fang">
                        <path className="ReactTime-fangShape" d="M0,10 20,10 10,0z" />
                        <path className="ReactTime-fangStroke" d="M0,10 10,0 20,10" />
                    </svg>
                    <div className={`ReactTime-container ${this.renderWidthClass()}`}>
                        <button
                            type="button"
                            onClick={this.closeClickHandler}
                            className="ReactTime-close"
                        >
                            <strong>x</strong>
                        </button>
                        <div className="ReactTime-input-container">
                            <div className="ReactTime-input-wrap">
                                <button
                                    type="button"
                                    onClick={() => this.arrowClickHandler('hour', 'up')}
                                    className="ReactTime-arrow-button"
                                >
                                    <FontAwesomeIcon
                                        size="2x"
                                        icon={faCaretUp}
                                        className="ReactTime-caret"
                                    />
                                </button>
                                <span>
                                    <input
                                        className="ReactTime-input"
                                        type="text"
                                        maxLength="2"
                                        onChange={this.valueChangeHours.bind(this)}
                                        value={currentHours}
                                        name="currentHours"
                                    />
                                </span>
                                <button
                                    type="button"
                                    onClick={() => this.arrowClickHandler('hour', 'down')}
                                    className="ReactTime-arrow-button"
                                >
                                    <FontAwesomeIcon
                                        size="2x"
                                        icon={faCaretDown}
                                        className="ReactTime-caret"
                                    />
                                </button>
                            </div>

                            <div className="ReactTime-input-wrap">
                                <button
                                    type="button"
                                    onClick={() => this.arrowClickHandler('min', 'up')}
                                    className="ReactTime-arrow-button"
                                >
                                    <FontAwesomeIcon
                                        size="2x"
                                        icon={faCaretUp}
                                        className="ReactTime-caret"
                                    />
                                </button>
                                <span>
                                    <input
                                        className="ReactTime-input"
                                        type="text"
                                        maxLength="2"
                                        onChange={this.valueChangeMinutes}
                                        value={currentMinutes}
                                        name="currentMinutes"
                                    />
                                </span>
                                <button
                                    type="button"
                                    onClick={() => this.arrowClickHandler('min', 'down')}
                                    className="ReactTime-arrow-button"
                                >
                                    <FontAwesomeIcon
                                        size="2x"
                                        icon={faCaretDown}
                                        className="ReactTime-caret"
                                    />
                                </button>
                            </div>
                            {this.renderMeridian()}
                        </div>
                        <div className="ReactTime-button-container">
                            <button
                                className="ReactTime-button ReactTime-done-button"
                                onClick={this.setValueClickHandler}
                                type="button"
                            >
                                {'Done'}
                            </button>
                            <button
                                className="ReactTime-button ReactTime-reset-button"
                                onClick={this.resetValueClickHandler}
                                type="button"
                            >
                                {'Reset'}
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }

    renderWidthClass() {
        const { isMilitaryTime } = this.props;
        if (!isMilitaryTime) {
            return 'ReactTime-container-normal';
        }
        return 'ReactTime-container-meridian';
    }

    renderMeridian() {
        const { isMilitaryTime } = this.props;
        const { meridian } = this.state;
        if (!isMilitaryTime) {
            return (
                <div className="ReactTime-input-wrap" id="meridian">
                    <button
                        type="button"
                        onClick={() => this.arrowClickHandler('meri', 'up')}
                        className="ReactTime-arrow-button"
                    >
                        <FontAwesomeIcon size="2x" icon={faCaretUp} className="ReactTime-caret" />
                    </button>
                    <span>
                        <input
                            className="ReactTime-input"
                            type="text"
                            maxLength="2"
                            name="meridian"
                            value={meridian}
                            readOnly
                        />
                    </span>
                    <button
                        type="button"
                        onClick={() => this.arrowClickHandler('meri', 'down')}
                        className="ReactTime-arrow-button"
                    >
                        <FontAwesomeIcon size="2x" icon={faCaretDown} className="ReactTime-caret" />
                    </button>
                </div>
            );
        }
        return null;
    }

    render() {
        const { value } = this.state;
        const { placeholder, onChange, inputClass } = this.props;
        return (
            <div className="input-wrapper">
                <input
                    type="text"
                    className={inputClass}
                    onClick={this.reactTimeClickHandler}
                    value={value}
                    placeholder={placeholder}
                    onChange={e => onChange && onChange(e.target.value)}
                />
                {this.renderTimepicker()}
            </div>
        );
    }
}

ReactTimeSelection.propTypes = {
    isMilitaryTime: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onTimeChange: PropTypes.func,
    onChange: PropTypes.func,
    inputClass: PropTypes.string,
};

ReactTimeSelection.defaultProps = {
    isMilitaryTime: false,
    placeholder: '',
    value: '',
    inputClass: '',
    onTimeChange: () => null,
    onChange: () => null,
};

export default ReactTimeSelection;
