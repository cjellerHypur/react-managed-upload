import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './ReactManagedUpload.css';

import uniqueId from 'lodash.uniqueid';
import ManagedFile from './ManagedFile';
import DragAndDrop from './DragAndDrop';
import LocalFile, { STATUS } from './LocalFile';

function toReturnFiles(localFileArray) {
    return localFileArray.map(file => ({
        status: file.status,
        serverInfo: file.serverInfo,
        fileInfo: file.fileInfo,
        localID: file.localID,
    }));
}

class ReactManagedUpload extends Component {
    fileInput = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            files: props.files || [],
        };
    }

    onSuccessfulUpload = (localFile, res) => {
        const { files } = this.state;
        let index = -1;
        files.forEach((stateFile, i) => {
            if (stateFile.localID === localFile.localID) {
                index = i;
            }
        });

        if (index >= 0) {
            files[index].status = STATUS.LOADED;
            files[index].serverInfo = res;
        }

        this.setState({ files });
        return toReturnFiles(files);
    };

    cancelUpload = (localID) => {
        const { files } = this.state;
        files.forEach((stateFile, i) => {
            if (stateFile.localID === localID) {
                files[i].abortUpload.stop();
                files[i].status = STATUS.CANCELED;
            }
        });
        this.setState({ files });
    };

    onFailedUpload = (localFile) => {
        const { files } = this.state;
        let index = -1;
        files.forEach((stateFile, i) => {
            if (stateFile.localID === localFile.localID) {
                index = i;
            }
        });

        if (index >= 0) {
            files[index].status = STATUS.FAILED;
        }

        this.setState({ files });
    };

    uploadFiles = (newfiles) => {
        const { upload } = this.props;
        const { files } = this.state;
        if (upload) {
            newfiles.forEach((file) => {
                if (file.status === STATUS.UPLOADING) {
                    const cancel = upload(file, this.onSuccessfulUpload, this.onFailedUpload);
                    files.forEach((stateFile, i) => {
                        if (stateFile.localID === file.localID) {
                            files[i].abortUpload = cancel;
                        }
                    });
                }
            });
        }
    };

    reupload = (localFile) => {
        const { files } = this.state;
        files.forEach((stateFile, i) => {
            if (stateFile.localID === localFile.localID) {
                files[i].status = STATUS.UPLOADING;
            }
        });
        this.setState({ files });
        this.uploadFiles([localFile]);
    };

    dropAreaClickHandler = () => {
        this.fileInput.current.click();
    };

    updateFilesList = (newFiles) => {
        const { files } = this.state;
        for (let i = 0; i < newFiles.length; i += 1) {
            files.push(new LocalFile(newFiles[i]));
        }
        this.setState({ files });
        this.uploadFiles(files);

        // init file input
        this.fileInput.current.value = '';
    };

    handleDrop = (newFiles) => {
        this.updateFilesList(newFiles);
    };

    onFilesAdded = (e) => {
        const newFiles = e.target.files;
        this.updateFilesList(newFiles);
    };

    downloadFile = (localFile) => {
        const { download } = this.props;
        download(localFile);
    };

    getFiles = () => {
        const { files } = this.state;
        return files;
    }

    removeFile = (localFile) => {
        // remove from input element by clearing value
        this.fileInput.current.value = '';
        // remove from server
        const { remove } = this.props;
        remove(localFile, this.getFiles);

        // remove from state
        const { files } = this.state;
        files.forEach((stateFile, i) => {
            if (stateFile.localID === localFile.localID) {
                files.splice(i, 1);
            }
        });
        this.setState({ files });
    };

    render() {
        const { files } = this.state;
        const { readOnly, allowMultiple } = this.props;
        return (
            <div className="upload-wrapper">
                {!readOnly && (
                    <Fragment>
                        <input
                            type="file"
                            ref={this.fileInput}
                            multiple={allowMultiple}
                            disabled={readOnly}
                            className="upload-browser"
                            onChange={this.onFilesAdded}
                        />

                        <DragAndDrop
                            handleDrop={this.handleDrop}
                            className="upload-drop-area"
                            onClick={this.dropAreaClickHandler}
                        >
                            <div className="upload-drop-label">
                                {'Drag & Drop your files or '}
                                <span className="browse-span"> Browse</span>
                            </div>
                        </DragAndDrop>
                    </Fragment>
                )}

                {files.length > 0 && (
                    <div className="upload-list-scroller">
                        <ul className="upload-list">
                            {files.map(localFile => (
                                <ManagedFile
                                    localFile={localFile}
                                    key={uniqueId()}
                                    abort={this.cancelUpload}
                                    reupload={this.reupload}
                                    download={this.downloadFile}
                                    remove={this.removeFile}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

ReactManagedUpload.propTypes = {
    files: PropTypes.arrayOf(PropTypes.shape({
        status: PropTypes.string,
        source: PropTypes.string,
        hash: PropTypes.string,
        serverID: PropTypes.string,
        fileInfo: PropTypes.shape({
            name: PropTypes.string,
            size: PropTypes.number,
        }),
        localID: PropTypes.string,
    })).isRequired,
    allowMultiple: PropTypes.bool.isRequired,
    readOnly: PropTypes.bool.isRequired,
    upload: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
};

ReactManagedUpload.defaultProps = {};

ReactManagedUpload.defaultProps = {};

export default ReactManagedUpload;
