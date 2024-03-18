import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DeleteContent from './DeleteContent';
import { Client, Databases } from "appwrite";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import axios from 'axios';
import { useEffect, useState } from "react";

const client = new Client();

const databases = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('internshipProject') // Your project ID
;


class MyProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        datas: []
      };
     
      
    }
    componentDidMount() {
      const promise = databases.listDocuments('scribblerDb', 'scribbles');
    
      promise
        .then((response) => {
          this.setState({ datas: response.documents });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    deleteDocument(documentId) {
      const promise = databases.deleteDocument('scribblerDb', 'scribbles', documentId);
    
      promise
        .then((response) => {
          console.log(response); // Success
          // Perform any additional operations or update the state if needed
        })
        .catch((error) => {
          console.log(error); // Failure
        });
    }

    updateDocument(documentId) {
      
      const newData = {
        category: 'upCategory',
        description: 'UpDescription',
        content: 'UpdatedContent',
      };
  
      const promise = databases.updateDocument('scribblerDb', 'scribbles', documentId, newData);
  
      promise
        .then((response) => {
          console.log(response); // Success
         
        })
        .catch((error) => {
          console.log(error); // Failure
        });
    }
    
    
    
    render() {
      const header = (
        <div className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={this.state.globalFilter}
            onChange={this.onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </div>
      );
    
      const deleteTemplate = (rowData) => {
        return (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger"
            onClick={() => this.deleteDocument(rowData.$id)}
          />
        );
      };

      const updateTemplate = (rowData) => {
        return (
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success"
            onClick={() => this.updateDocument(rowData.$id)}
          />
        );
      };
    
      return (
        <div className="App">
          <h1>Profile</h1>
          
          <div className="p-datatable-custom">
            <DataTable
              value={this.state.datas}
              header={header}
              paginator
              rows={5}
              emptyMessage="No data found"
              className="p-datatable-striped"
            >
              <Column field="category" header="Category" />
              <Column field="description" header="Description" />
              <Column field="content" header="Content" />
              <Column header = "delete" body={deleteTemplate} style={{ textAlign: 'center', width: '6rem' }} />
              <Column header = "Update" body={updateTemplate} style={{ textAlign: 'center', width: '6rem' }} />
            </DataTable>
          </div>
        </div>
      );
    }
    
    
    
  }
  
  export default MyProfile;