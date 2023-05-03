import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
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
    <td>{props.date}</td>
  </tr>
  </>);

}
const Urepairs=(props)=>{
  // const [refresh,setrefresh]=useState(false);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[values,setValues]= useState({urepairs:'yes',username:props.username,roll:props.roll});
 //To post the data into the database..
  const handleSubmit=async()=>{
    handleClose();  
    try{
 const response=await fetch("http://localhost:8009/repairp",{
  method:"POST",
  body:JSON.stringify(values),
  headers:{
     "Content-Type":"application/json"
    
  } 

 });
console.log(response);
}
    catch(err){
     console.log('err');
    }
    handleClose();
 }
// if(refresh===true)
// {
//   console.log(refresh)
// }

//to  get the data from database..
 const getUsers = async () => {
  
  
  try {
    
    const response = await fetch('http://localhost:8009/repairsg/'+props.username, {
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

});


  const handleChange = (event)=>{
    setValues({
        ...values,
        [event.target.name]: event.target.value,
             });
       console.log(values);
                              }

   
    return(
        <>
        <div className='row'>
      <div className='header col-md-12' style={{backgroundColor:'#333'}}>
        <h1>Resource Allocator</h1>
       
        </div>
        </div>
        <div style={{ display: 'flex', height: '91vh' }}>
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
                  <NavLink exact to="/Ubundles" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="table"> Bundles Info</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact to="/Urepairs" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="user">Repairs & Maintanance</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact to="/Ureports" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="chart-line">User Reports</CDBSidebarMenuItem>
                  </NavLink>
                  <CDBSidebarMenuItem icon="arrow-left"><a href='/'>Logout</a></CDBSidebarMenuItem>
                </CDBSidebarMenu>
              </CDBSidebarContent>

              
            </CDBSidebar >&nbsp;&nbsp;&nbsp;
             
        <div className='col-md-9'id='main'  >
        <div className='row' style={{paddingTop:'2%',paddingRight:'10%'}}>
               
               <div className='col-md-4 offset-md-5'><center><h4 className='tab'>Repairs & Maintainance </h4></center></div>
               </div>
          <div className='container' id='p1' style={{width:'94%',boxShadow:'5px 5px 4px',marginLeft:'6%'}}>
           <div className='row'style={{paddingTop:"2%",}}>
           <div className=' col-md-4 head'>
          
          <h5 id='repair'>Repairs & Maintainance Report:</h5>
          </div>
          <div className='col-md-1 offset-md-7'>
         <div><Button variant="success" onClick={handleShow}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter The Repair & Maintainance Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className='form-wrapper'>
                <div className='userid'>
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>UserId</label><br/>
                    <input  type="text" name="userid" onChange={handleChange}  style={{width:'75%'}} />
                    
                </div><br/>
                <div className="machineid">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>Machine Id</label><br/>
                    <input  type='text' name="machineid" onChange={handleChange}  style={{width:'75%'}} />
                    </div><br/>
                <div className="college">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>College</label><br/>
                    <input  type="text"  name="college" onChange={handleChange}  style={{width:'75%'}} />
                    </div><br/>
                <div className="location">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>Location</label><br/>
                    <input  type="text" name="location" onChange={handleChange}  style={{width:'75%'}}/>
                    </div><br/>
                
                <div className="typeofwork">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>Type of Work</label><br/>
                    <input  type="text" name="typeofwork"onChange={handleChange}  style={{width:'75%'}} />
                    </div><br/>
                    <div className="typeofmaterial">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>Type of Material</label><br/>
                    <input  type="text" name="typeofmaterial" onChange={handleChange}  style={{width:'75%'}}/>
                    </div><br/>
                    <div className="machinereading">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>Machine Reading</label><br/>
                    <input  type="text" name="machinereading" onChange={handleChange}  style={{width:'75%'}} />
                    </div><br/>
                    <div className="Amount">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>Amount</label><br/>
                    <input  type="text" name="amount" onChange={handleChange}  style={{width:'75%'}} />
                    </div><br/>
                    <div className="remarks">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>Remarks</label><br/>
                    <input  type="text" name="remarks" onChange={handleChange}  style={{width:'75%'}}/>
                    </div><br/>
                    <div className="Date">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>Date</label><br/>
                    <input  type="date" name="date" onChange={handleChange}  style={{width:'75%'}} />
                    </div><br/>
            
            </form>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal></div>
          </div>
        <br/>
        <br/>
      
       
      
           </div>
           <br/>
            <div className='tbl-container' id='table'>
              <div className='tbl-fixed'>
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
                {users.map((user,i)=>{return(<><GetRepairs sno={i+1} userid={user.userid} machineid={user.machineid} college={user.college} location={user.location} typeofwork={user.typeofwork} typeofmaterial={user.typeofmaterial} machinereading={user.machinereading} amount={user.amount} remark={user.remarks} date={user.date} /></>)})}
                </tbody>
             
              </Table>
              </div>
              <br/>
            
            </div>
          </div>         
<br/>
        </div>
       
          
  
        
       </div>
      
        </>
    )
}
export default Urepairs;
