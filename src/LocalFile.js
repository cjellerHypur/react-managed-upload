import uniqueId from 'lodash.uniqueid';

export const STATUS = {
    UPLOADING: 'UPLOADING',
    LOADED: 'LOADED',
    FAILED: 'FAILED',
    DELETING: 'DELETING',
    CANCELED: 'CANCELED',
};


class LocalFile {
    constructor(file) {
        this.status = STATUS.UPLOADING;
        this.serverInfo = {};
        this.file = file;
        this.fileInfo = {
            name: file.name,
            size: file.size,
        };
        this.localID = uniqueId(`file_${new Date().getTime()}_`);
        this.abortUpload = null;
    }
}

export default LocalFile;
