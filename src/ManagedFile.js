import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowDown,
    faTrash,
    faCircleNotch,
    faTimes,
    faRedo,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import LocalFile, { STATUS } from './LocalFile';

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    const base = 1024 ** i;
    return `${(bytes / base).toFixed(1)} ${sizes[i]}`;
}

const ManagedFile = ({
    localFile, abort, reupload, download, remove, readOnly,
}) => (
    <li>
        <div
            className={classNames('managedFile', {
                fileLoadedFailure: localFile.status === STATUS.FAILED,
                fileLoadedSuccess: localFile.status === STATUS.LOADED,
            })}
        >
            <div className="fileInfo">
                <div className="fileName">{localFile.fileInfo.name}</div>
                <div className="fileSize">{bytesToSize(localFile.fileInfo.size)}</div>
            </div>
            <div className="fileControlsRight">
                <div className="fileHelp">
                    {localFile.status === STATUS.UPLOADING && (
                        <Fragment>
                            <div className="fileMessage">Uploading File...</div>
                        </Fragment>
                    )}
                    {localFile.status === STATUS.CANCELED && (
                        <Fragment>
                            <div className="fileMessage">Canceled Upload</div>
                            <div className="fileSubMessage">Click to try again</div>
                        </Fragment>
                    )}
                    {localFile.status === STATUS.FAILED && (
                        <Fragment>
                            <div className="fileMessage">Upload Failed!</div>
                            <div className="fileSubMessage">Click to try again</div>
                        </Fragment>
                    )}
                </div>
                <div className="fileControlButtons">
                    {localFile.status === STATUS.LOADED && (
                        <Fragment>
                            <button
                                className="fileControlButton"
                                type="button"
                                onClick={() => download(localFile)}
                            >
                                <FontAwesomeIcon icon={faArrowDown} />
                            </button>
                            {!readOnly && (
                                <button
                                    className="fileControlButton"
                                    type="button"
                                    onClick={() => remove(localFile)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            )}
                        </Fragment>
                    )}
                    {(localFile.status === STATUS.UPLOADING && !readOnly) && (
                        <Fragment>
                            <button className="fileControlButton" disabled type="button">
                                <FontAwesomeIcon icon={faCircleNotch} spin />
                            </button>
                            <button
                                className="fileControlButton"
                                type="button"
                                onClick={() => abort(localFile.localID)}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </Fragment>
                    )}
                    {(localFile.status === STATUS.FAILED && !readOnly) && (
                        <Fragment>
                            <button
                                className="fileControlButton"
                                type="button"
                                onClick={() => reupload(localFile)}
                            >
                                <FontAwesomeIcon icon={faRedo} />
                            </button>
                            <button
                                className="fileControlButton"
                                type="button"
                                onClick={() => remove(localFile)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </Fragment>
                    )}
                    {(localFile.status === STATUS.CANCELED && !readOnly) && (
                        <Fragment>
                            <button
                                className="fileControlButton"
                                type="button"
                                onClick={() => reupload(localFile)}
                            >
                                <FontAwesomeIcon icon={faRedo} />
                            </button>
                            <button
                                className="fileControlButton"
                                type="button"
                                onClick={() => remove(localFile)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    </li>
);

ManagedFile.propTypes = {
    localFile: PropTypes.instanceOf(LocalFile).isRequired,
    abort: PropTypes.func.isRequired,
    reupload: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
};

export default ManagedFile;
