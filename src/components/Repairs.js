import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import { FaUser} from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './repairs.css';
const GetRepairs=(props)=>{
  return(<>
  <tr>
  <td>{props.sno}</td>
    <td>{props.userid}</td>
    <td>{props.machineid}</td>
    <td>{props.college}</td>
    <td>{props.location}</td>
    <td>{props.typeofwork}</td>
    <td>{props.typeofmaterial}</td>
    <td>{props.machinereading}</td>
    <td>{props.amount}</td>
    <td>{props.remark}</td>
    
  </tr>
  </>);

}
const Repairs=(props)=>{
  const [show, setShow] = useState(false);
  const[search,setsearch]=useState({});
  const[searchres,setsearchres]=useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const active={
        color:'white'
    }


    const[users,setUsers]=useState([]);
    const handleSearch=async()=>{
      handleShow();
      try{
        const resp=await fetch('http://localhost:8009/searchres/'+search.usersearch,{
          methos:'GET'
        })
        const result=await resp.json();
        setsearchres(result);
        
      }
      catch(err){
        console.log(err);
      }
    }


    const handsearch=(e)=>{
      setsearch({
        [e.target.name]:e.target.value
      })
    }
    const getUsers = async () => {
  
  
      try {
        
        const response = await fetch('http://localhost:8009/repairs', {
          method: 'GET'
        });
        const result = await response.json();
     
      setUsers(result);
    
       
      } 
      catch (error) {
        console.log(error);
      }
    }
    
    useEffect(() => {
      getUsers();
    
    }, []);
    

    return(
        <div className='box'>
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
        
        <div className='col-md-9'id='main' >
          <div className='row'>
            <div className='col-md-3 offset-md-4'>
              <h4 style={{color:'white',backgroundColor:'crimson',textAlign:'center',padding:'2%',borderRadius:'10px'}}> Repairs & Maintainance</h4>
            </div>
          </div>
          <div className='container' id='p1' style={{marginLeft:'3%'}}>
           <div className='row'style={{paddingTop:"2%"}}>
           <div className=' col-md-3 head'>
          
          <h5 id='repair'>Report:</h5>
          </div>
         
        <br/>
        <br/>
       <div className='row'>
        <div className='col-md-2 offset-md-9'>
        <input type='text' name='usersearch'onChange={handsearch} placeholder='enter the userid'/>   
        </div>
        <div className='col-md-1'>
        <button className='btn btn-sm btn-primary' onClick={handleSearch}>Search</button> 
        </div>
        <Modal show={show} onHide={handleClose} width={'20%'}>
        <Modal.Header closeButton>
          <Modal.Title>Realted Content tothe search option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='App tbl-container'>
                  <div className='tbl-fixed' style={{height:'auto'}}>
                  <Table responsive bordered='true' >
                    <thead>
                    <tr >
                  <th>S.No</th>
                  <th>User Id</th>
                  <th>Machine Id</th>
                  <th>College</th>
                  <th>Location</th>
                  <th>Type of Work</th>
                  <th>Type of Material</th>
                  <th>Machine Reading</th>
                  <th>Amount</th>
                  <th>Remarks</th>
                  <th>Date</th>
                </tr>
                    </thead>
                    <tbody>
                    {searchres.map((user,i)=>{return(<GetRepairs sno={i+1} userid={user.userid} machineid={user.machineid} college={user.college} location={user.location} typeofwork={user.typeofwork} typeofmaterial={user.typeofmaterial} 
                    machinereading={user.machinereading} amount={user.amount} remark={user.remarks} date={user.date}/>)})}
               
                    </tbody>
                  </Table>
                  </div>
                </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='btn btn-md btn-danger' onClick={handleClose}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>

       </div>
   
      
           </div>
           <br/>
            <div className='tbl-container' id='table'>
              <div className='row tbl-fixed' style={{height:'62vh'}}>
              <Table responsive bordered='true'>
                <thead>
                <tr >
                  <th>S.No</th>
                  <th>User Id</th>
                  <th>Machine Id</th>
                  <th>College</th>
                  <th>Location</th>
                  <th>Type of Work</th>
                  <th>Type of Material</th>
                  <th>Machine Reading</th>
                  <th>Amount</th>
                  <th>Remarks</th>
                  <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user,i)=>{return(<GetRepairs sno={i+1} userid={user.userid} machineid={user.machineid} college={user.college} location={user.location} typeofwork={user.typeofwork} typeofmaterial={user.typeofmaterial} machinereading={user.machinereading} amount={user.amount} remark={user.remarks} date={user.date}/>)})}
                </tbody>
              </Table>
              </div>
              <br/>
            
            </div>
          </div>         

        </div>
       
          </div>
  
        </div>
       
    
    )
}
export default Repairs;