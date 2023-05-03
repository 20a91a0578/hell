import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
// const arr=new Array();
// const Getquery=(props)=>{
//  arr.push(props.queryid)
//   localStorage.setItem('accept', props.queryid);
//   localStorage.setItem('delete', props.queryid);
//   return(
//     <>
//     <tr>
//       <td>{props.sno}</td>
//       <td>{props.query}</td>
//       <td id="accept" ><button className='btn btn-success btn-md' onClick={props.add}>Accept</button></td>
//       <td id="reject" ><button className='btn btn-success btn-md' onClick={props.remove}>Accept</button></td>
//     </tr>
//     </>
//   )
// }
const Getusers=(props)=>{
  return(
    <>
    <tr>
      <td>{props.sno}</td>
      <td>{props.userid}</td>
      <td>{props.username}</td>
      <td>{props.email}</td>
      <td>{props.password}</td>
      
    </tr>
    </>
  )
}
const Login = (props) => {
  const active={
    color:'white'
  }
  const [users,setUsers]=useState([]);
  const getUsers=async()=>{
try{
const result=await fetch('http://localhost:8009/users',{
  method:'GET'
})
const userss=await result.json();
setUsers(userss);
}
catch(err)
{
  console.log(err);
}
  }
//   const [resultq,setresquery]=useState([])
//   const getQuery=async()=>{
//       try{
//         const res=await fetch('http://localhost:8009/queryss',{
//           method:'GET'
//         })
//         const result=await res.json();
//         setresquery(result);
//         console.log(result)
      
//       }
//       catch(err)
//       {
//         console.log(err);
//       }
//   }
//   const handleaccept=(a)=>{
//    alert(arr  )
    
//   }
// const handleremove=(b)=>{
//   alert(b)
// }
useEffect(()=>{
  getUsers();
})
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
<div className='col-md-3 offset-md-4' style={{padding:'2%',textAlign:'center'}}><h6 style={{backgroundColor:'crimson',color:'white',padding:'3%',borderRadius:'10px'}}>Current Users Count   : &nbsp;&nbsp;{users.length}</h6></div>



<div className='col-md-9 ' style={{marginLeft:'10%'}}>
<div className='col-md-2 ' style={{color:'white',backgroundColor:'crimson',textAlign:'center',padding:'.5%',borderRadius:'10px'}}>
            User Information
           
          </div>
          <br/>
    <div className='row'>
    
          
      <div className='col-md-12  boxinfo '>
      <br/>
         <div className='row'>
          
         <div className='col-md-12 '>
          <div className='row tbl-fixed'>
           
            <Table responsive  style={{textAlign:'left'}} bordered='true'>
            <thead>
              <tr>
                <th>Sno</th>
                <th>UserID</th>
                <th>username</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
           </thead>
           <tbody>
           {users.map((ele,i)=>{
               return(<Getusers sno={i+1} userid={ele._id} username={ele.username} password={ele.password} email={ele.email}/> )
              })}
            </tbody>

          </Table>

        </div>
        
        </div>
         </div>

      </div>
    </div>
    
    {/* <div className='container' style={{marginTop:'5%',boxShadow:'5px 5px 4px'}}>
      <div className='row first'>
      <div className='col-md-3 offset-md-5' style={{padding:'2%',textAlign:'center'}}><h4 style={{backgroundColor:'crimson',color:'white',padding:'4px',borderRadius:'10px'}}>
        User Request</h4></div>
        <div className='col-md-6 offset-md-3 tbl-container'>
          <div className='row tbl-fixed'>
                                  <Table responsive  style={{textAlign:'left'}}>
            <thead>
              <tr>
                <th>QueryID</th>
                <th>Query</th>
                <th>Accept</th>
                <th>Reject</th>
              </tr>
           </thead>
           <tbody>
           {resultq.map((ele,i)=>{
               return( <Getquery sno={i+1}  queryid={ele._id}  query={ele.query} add={()=>handleaccept(localStorage.getItem('accept'))} remove={()=>handleremove(localStorage.getItem('delete'))}/>)
              })}
            </tbody>

          </Table>

        </div>
        
        </div>

          


      </div>
    </div> */}
  
</div>

</div>
          
         

      </div>

    </div>
   
  
)
}

export default Login;
{/* <div className='col-md-10'>
<div className='col-md-3 offset-md-4' style={{padding:'2%',textAlign:'center'}}><h6 style={{backgroundColor:'crimson',color:'white',padding:'3%',borderRadius:'10px'}}>Current Users Count   : &nbsp;&nbsp;{users.length}</h6></div>



<div className='col-md-10 ' style={{marginLeft:'3%'}}>
<div className='col-md-2' style={{color:'white',backgroundColor:'crimson',textAlign:'center',padding:'.5%',borderRadius:'10px'}}>
            User Information
           
          </div>
          <br/>
    <div className='row'>
    
          
      <div className='col-md-12  boxinfo '>
      <br/>
         <div className='row'>
          
         <div className='col-md-12 '>
          <div className='row tbl-fixed'>
           
            <Table responsive  style={{textAlign:'left'}} bordered='true'>
            <thead>
              <tr>
                <th>Sno</th>
                <th>UserID</th>
                <th>username</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
           </thead>
           <tbody>
           {users.map((ele,i)=>{
               return(<Getusers sno={i+1} userid={ele._id} username={ele.username} password={ele.password} email={ele.email}/> )
              })}
            </tbody>

          </Table>

        </div>
        
        </div>
         </div>

      </div>
    </div>
     */}
    {/* <div className='container' style={{marginTop:'5%',boxShadow:'5px 5px 4px'}}>
      <div className='row first'>
      <div className='col-md-3 offset-md-5' style={{padding:'2%',textAlign:'center'}}><h4 style={{backgroundColor:'crimson',color:'white',padding:'4px',borderRadius:'10px'}}>
        User Request</h4></div>
        <div className='col-md-6 offset-md-3 tbl-container'>
          <div className='row tbl-fixed'>
                                  <Table responsive  style={{textAlign:'left'}}>
            <thead>
              <tr>
                <th>QueryID</th>
                <th>Query</th>
                <th>Accept</th>
                <th>Reject</th>
              </tr>
           </thead>
           <tbody>
           {resultq.map((ele,i)=>{
               return( <Getquery sno={i+1}  queryid={ele._id}  query={ele.query} add={()=>handleaccept(localStorage.getItem('accept'))} remove={()=>handleremove(localStorage.getItem('delete'))}/>)
              })}
            </tbody>

          </Table>

        </div>
        
        </div>

          


      </div>
    </div> */}
  
// </div>

// </div>