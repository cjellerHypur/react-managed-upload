import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DragAndDrop extends Component {
    state = {
        dragging: false,
    };

    dropRef = React.createRef();

    componentDidMount() {
        const div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);
    }

    componentWillUnmount() {
        const div = this.dropRef.current;
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop);
    }

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter += 1;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({ dragging: true });
        }
    };

    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter -= 1;
        if (this.dragCounter === 0) {
            this.setState({ dragging: false });
        }
    };

    handleDrop = (e) => {
        const { handleDrop } = this.props;
        e.preventDefault();
        e.stopPropagation();
        this.setState({ dragging: false });
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleDrop(e.dataTransfer.files);
            e.dataTransfer.clearData();
            this.dragCounter = 0;
        }
    };

    render() {
        const { dragging } = this.state;
        const { children, className, onClick } = this.props;
        return (
            <div
                className={className}
                style={{ position: 'relative' }}
                onClick={onClick}
                ref={this.dropRef}
            >
                {dragging && (
                    <div
                        style={{
                            border: 'dashed grey 4px',
                            backgroundColor: 'rgba(255,255,255,.8)',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 9999,
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: 0,
                                left: 0,
                                textAlign: 'center',
                                color: 'grey',
                                fontSize: '20px',
                            }}
                        />
                    </div>
                )}
                {children}
            </div>
        );
    }
}

DragAndDrop.propTypes = {
    handleDrop: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default DragAndDrop;
