import React, { Component } from 'react'
import ManagedUpload from 'react-managed-upload'
import axios from 'axios';
const CancelToken = axios.CancelToken;

export default class App extends Component {
  state = {
    files: [{
      fileInfo: {
        name: 'test.txt',
        size: 12,
      },
      localID: 'file_1553189270561_1',
      serverInfo: {
        Hash: '1F471F9200BC81A2360684FA876F57BC',
        ID: '4454',
        Value: 'test.txt',
      },
      status: 'LOADED',
    }],
    readOnly: true,
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
                'filetag': 'testtag',
                'ownerID': '',
                'formDataId': 40,
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
          // axios.get(`/files/${localFile.serverInfo.ID}/${localFile.serverInfo.Hash}`);
          window.open(`http://localhost:36596/api/files/${localFile.serverInfo.ID}/${localFile.serverInfo.Hash}`);
        }}
        remove={(localFile, getFiles) => {
          axios.delete(`/files/${localFile.serverInfo.ID}/${localFile.serverInfo.Hash}`)
          .then(() => {
            const files = getFiles();
            this.setState({files});
          })
        }}
        />
      </div>
    )
  }
}
