# react-managed-upload

> A simple managed upload component based on [filepond](https://github.com/pqina/filepond) && [react-filepond](https://github.com/pqina/react-filepond). The main change being the link between the server files and the UI. In addition, this library requires manual configuration of upload, download, and remove functions rather than trying to create a "one size fits all" generic server call. Because of this, you can use any HTTP library of your choice. We recommend [axios](https://github.com/axios/axios)!

## Install

```bash
npm install --save react-managed-upload
```

## Usage

**See the /example directory for a full example with function parameters**

```jsx
import React, { Component } from "react";
import ReactManagedUpload from "react-managed-upload";

export default class App extends Component {
  state = {
    files: [],
    readOnly: false,
    allowMultiple: true
  };
  render() {
    const { files, readOnly, allowMultiple } = this.state;
    return (
      <div>
        <ReactManagedUpload
          files={files}
          readOnly={readOnly}
          allowMultiple={allowMultiple}
        />
      </div>
    );
  }
}
```

## Props

```
files: PropTypes.arrayOf(
  PropTypes.shape({
    status: PropTypes.string,
    serverInfo: PropTypes.object,
    fileInfo: PropTypes.shape({
      name: PropTypes.string,
      size: PropTypes.number,
    }),
    localID: PropTypes.string,
  })
),
allowMultiple: PropTypes.bool.isRequired,
readOnly: PropTypes.bool.isRequired,
upload: PropTypes.func,
download: PropTypes.func,
remove: PropTypes.func,
```

## Prop function signatures

### Upload

The upload prop function runs when the component receives a new file either, and runs once for each file. It provides the following parameters:

1. localFile Object (file, status, serverInfo, fileInfo, and localID properties)
2. onSuccess callback (expecting the localFile and response data as parameters)
3. onFailure callback (expecitng the localFile as a parameter)

**IMPORTANT:** The upload function expects a return object with a stop property as an arrow function to abort the upload http request. Take a look at the example code on how to do this with an Axios cancel token.

In axios, aborting the upload hits the catch of the api call. Rather than throwing an error, we check for this before we call the onFailure callback.

```
upload={(localFile, onSuccess, onFailure) => {

  api
  .uploadFile(localfile.file)
  .then((res) => {
    onSuccess(localFile, res.data);
  })
  .catch((err) => {
    if(err.message !== 'aborted upload') {
      onFailure(localFile);
    }
  });

  return {
    stop: () => {
      cancel('aborted upload');
    }
  }
}}
```

### Download

The upload prop function runs when a user clicks on a file to download. It provides the following parameter:

1. localFile Object (status, serverInfo, fileInfo, and localID properties)

You can access the serverInfo property to provide necessary server information for the request

```
download={(localFile) => {
  api.get(`/files/${localFile.serverInfo.ID}`);
  window.open(`http://localhost/files/${localFile.serverInfo.ID}`);
}}
```

### Remove

The upload prop function runs when a user clicks on a file to download. It provides the following parameter:

1. localFile Object (status, serverInfo, fileInfo, and localID properties)
2. getFiles callback function. This can be used to get the current state of files after deleting the file from the server

You can access the serverInfo property on the localFile object to provide necessary server information for the request.

```
remove={(localFile, getFiles) => {
  api
  .delete(`/files/${localFile.serverInfo.ID}`)
  .then(() => {
    // get my state files
    getFiles();
  })
}}
```

## License

MIT © [cjellerHypur](https://github.com/cjellerHypur)
