import React, { Component } from 'react'
import ManagedUpload from 'react-managed-upload'
import axios from 'axios';
const CancelToken = axios.CancelToken;

export default class App extends Component {
  state = {
    files: [],
    readOnly: false,
    allowMultiple: true,
  }
  render () {
    const { files, readOnly, allowMultiple } = this.state;
    return (
      <div style={{margin: '10px 40px', maxWidth: '600px'}}>
        <ManagedUpload
          files={files} 
          readOnly={readOnly} 
          allowMultiple={allowMultiple}
          upload={(localFile, onSuccess, onFailure) => {
            let cancel;
            axios.post('/files', localFile.file, {
              headers: {
                'Accept': 'application/json',
                'filename' : localFile.file.name,
              },
              cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
              })
            }).then((res) => {
              const allFiles = onSuccess(localFile, res.data);
              this.setState({files: allFiles});
            }).catch((err) => {
              if(err.message !== 'aborted upload') {
                onFailure(localFile);
              }
            });

            return {
              stop: () => {
                cancel('aborted upload');
              }
            }
          }
        }
        download={(localFile) => {
          axios.get(`/files/${localFile.serverInfo.ID}`);
        }}
        remove={(localFile, getFiles) => {
          axios.delete(`/files/${localFile.serverInfo.ID}`)
          .then(() => {
            const files = getFiles();
            this.setState({files});
          });
        }}
        />
      </div>
    )
  }
}
