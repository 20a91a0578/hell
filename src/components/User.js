import React,{useState,useEffect} from 'react';
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
const Getureports=(props)=>{
  return(<>
  <tr>
  <td>{props.sno}</td>
    <td>{props.date.substring(0,10)}</td>
    <td>{props.machineid}</td>
    <td>{props.college}</td>
    <td>{props.noofbun}</td>
    <td>{props.nopop}</td>
    <td>{props.noofcop}</td>
    <td>{props.oneside}</td>
    <td>{props.twoside}</td>
    <td>{props.noofprin}</td>
    <td>{props.remain}</td>
  </tr>
  </>)
}
const Usereport=(props)=>{
    const active={
        color:'white'
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [dates,setDates]=useState([]);
    const [values,setValues]=useState({});
    const handledate=(e)=>{
      setValues({
        ...values,
      [e.target.name]:e.target.value
         });
         }
      const submitdate=async()=>{
        try{
          const res=await fetch('http://localhost:8009/dashu/'+values.from+'/'+values.to,{
            method:'GET'
          })
         
          const dat=await res.json();
          setDates(dat);
          handleShow();
        }
        catch(err){
          console.log(err);
        }
      }
    const [results,setresults]=useState([])
const getUser=async()=>
{
  try{
    const response= await fetch('http://localhost:8009/user',{
      method:'GET'
    })
    const result=await response.json()
    setresults(result);
  }
  catch(err)
  {
    console.log('error');
  }
}

useEffect(()=>
{
  getUser(); 
},[])

    return(
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
             
        <div className='col-md-9' style={{marginLeft:'2%'}}>
          <br/>
          <div className="row">
            <div className='col-md-2 offset-md-5'>
              <h4 className='option' style={{textAlign:'center'}}>Reports</h4>
            </div>
          </div><br/>
          <div className='boxinfo'style={{border:'1px solid black'}} >
          
            <br/>
          <div className="row 3">
            <div className='col-md-4 offset-md-4' >
              <div className="row">
                <div className='col-md-3'>From: </div>
                <div className='col-md-9'>
                  <input type='text'  placeholder='format:yyyy-mm-dd' name='from' onChange={handledate}></input>
                </div>
              </div>
              <br/>
                <div className='row'>
                  <div className='col-md-3'>To :</div>
                  <div className='col-md-9'>
                    <input type='text'  placeholder='format :yyyy-mm-dd' name='to' onChange={handledate}></input>
                  </div>
                </div>
            <br/>
                <div className='row 9'>
                  <div className="row 5">
                    <div className='col-md-5 offset-md-5'>
                    <div className='col-md-2 '><Button variant="primary" className='btn btn-md btn-success' onClick={submitdate}>
      Submit
      </Button>

      <Modal show={show} onHide={handleClose} width={'20%'}>
        <Modal.Header closeButton>
          <Modal.Title>Realted Content to the search option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='App tbl-container'>
                  <div className='tbl-fixed' style={{height:'30vh'}}>
                  <Table responsive bordered='true' >
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Date</th>
                        <th>Machine id</th>
                        <th>College</th>
                        <th>No of Bundles</th>
                        <th>No of Papers</th>
                        <th>No of Copies</th>
                        <th>OneSide copies</th>
                        <th>Twoside copies</th>
                        <th>No of prints</th>
                        <th>Remaining(papers)</th>
                      </tr>
                    </thead>
                    <tbody>
                  {dates.map((e,i)=>
                  {
                    return(
                    <Getureports sno={i+1} date={e.date} machineid={e.machineid} college={e.college} noofbun={e.noofbun} nopop={e.nopop}
                    noofcop={e.noofcop} oneside={e.oneside} twoside={e.twoside} noofprin={e.noofprin} remain={e.remain} />)
                  })}
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
                   
                  </div>
                </div>
                <br/> 


            </div>

           
          </div>
      
        </div>
        
          <br/><br/><br/>
          <div className="container" style={{borderRadius:'10px',boxShadow:'5px 5px 4px',height:'50vh'}}>
          <br/>
            <div className="row 6">
            <div className=' row collen' >
              <div className='col-md-4 offset-md-4' style={{textAlign:'center',color:'white',backgroundColor:"crimson",borderRadius:'10px',fontSize:'220%'}}>Machine Reports</div><br/>
            </div>
            <br/>
            <br/>
            <div className="row 7">
              <div className='container-fluid'>
                <br/>


              <div className='App tbl-container'>
                    <div className='tbl-fixed' style={{height:'36vh'}}>
                    <Table responsive bordered='true' >
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Date</th>
                          <th>Machine id</th>
                          <th>College</th>
                          <th>No of Bundles</th>
                          <th>No of Papers</th>
                          <th>No of Copies</th>
                          <th>OneSide copies</th>
                          <th>Twoside copies</th>
                          <th>No of prints</th>
                          <th>Remaining(papers)</th>
                        </tr>
                      </thead>
                      <tbody>
                    {results.map((e,i)=>
                    {
                      return(
                      <Getureports sno={i+1} date={e.date} machineid={e.machineid} college={e.college} noofbun={e.noofbun} nopop={e.nopop}
                      noofcop={e.noofcop} oneside={e.oneside} twoside={e.twoside} noofprin={e.noofprin} remain={e.remain} />)
                    })}
                      </tbody>
                    </Table>
                    </div>
                  </div>
              







                  <br/> 
                </div> <br/>
              </div>
            </div>
            </div>
          </div>
        </div>
          </div>
  
      
       
      
    )

}
export default Usereport;