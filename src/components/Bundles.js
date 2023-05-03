import React from 'react';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FaUser } from "react-icons/fa";
import { useState,useEffect } from 'react';

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
const Getdetails=(props)=>{
  return(
    <>
    <tr>
    <td>{props.sno}</td>
      <td>{props.userid}</td>
      <td>{props.college}</td>
      <td>{props.location}</td>
      <td>{props.bundlescount}</td>
      <td>{props.bundlesrecieved}</td>
      <td>{props.remarks}</td>
    </tr>
    </>
  )
}
const Bundles = (props) => {
  const active={
    color:'white'
  }
    const [results,setResults]=useState([])
  
   
    const getUsers = async () => {
      try {
        const response = await fetch('http://localhost:8009/bundles', {
          method: 'GET'
        });
        const result = await response.json();
     
      setResults(result);
    
       
      } 
      catch (error) {
        console.error(error);
      }
    }
    
    useEffect(() => {
      getUsers();
    
    }, []);
  return (
    
    <div>
    <div className='header col-md-12' style={{backgroundColor:'#333'}}>
        <h1>Resource Allocator</h1>
        
        </div>
      <div className='row' style={{ display: 'flex', height: '110vh' }}>
          <CDBSidebar textColor="#fff" backgroundColor="#333"  className='col-md-2'>
              <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                <h3 className="text-decoration-none" style={{ color: 'inherit' }}>
                  Menu
                </h3>
              </CDBSidebarHeader>

              <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu>
                  <NavLink exact to="/" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact to="/Login" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="chart-line">Logins Info</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact to="/Bundles" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="table"> Bundles Info</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact to="/Repairs" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="user">Repairs & Maintanance</CDBSidebarMenuItem>
                  </NavLink>
                 
                  <NavLink exact to="/User" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="chart-line">User Reports</CDBSidebarMenuItem>
                  </NavLink>
                  <CDBSidebarMenuItem icon="arrow-left"><a href='/'>Logout</a></CDBSidebarMenuItem>
                </CDBSidebarMenu>
              </CDBSidebarContent>

              
            </CDBSidebar >
            <div className='col-md-9'>
              <br/>
              <div className='row' style={{marginLeft:'10%'}}>
               
                <div className='col-md-2 offset-md-5'><center><div className='tab' >Bundles Info</div></center></div>
               
                </div>
                <br/>
                <div className='boxinfo' style={{marginLeft:'10%'}}>

                <div className='row'>
                  <div className='col-md-4 offset-md-4' style={{paddingTop:'2%'}}>
              <center><h5>Bundles Information</h5></center>
                  </div>
                  </div>
                  <div className='container-fluid' style={{paddingTop:'2%'}}>
                 <div className='row'>
                  <div className='col-md-12'>
                    




                    <div className='App  tbl-container ' ><div className='row tbl-fixed'>
                    <Table responsive bordered='true' > 
                      <thead>
                        <tr >
                          <th>S.No</th>
                          <th>UserID</th>
                          <th>College</th>
                          <th>Location</th>
                          <th>No of Bundels</th>
                          <th>Bundels Recived</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody >
                         {results.map((result,i)=>{return(<Getdetails sno={i+1} userid={result.userid} college={result.college} location={result.location} bundlescount={result.bundlescount} bundlesrecieved={result.bundlesrecieved}  remarks={result.remarks}/>)})}
                     </tbody>
                    </Table>
                    </div>
                  </div>
                  </div>
                 </div>
                  </div>

                </div>

            </div>
        </div>

      </div>
     
  
  )
}

export default Bundles
