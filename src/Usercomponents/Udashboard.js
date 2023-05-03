import React,{useState,useEffect} from 'react';

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
const Udashboard = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


   const [result,setResult]=useState([])
   const [noofbundles,setbun]=useState(0);
   const [noofpapers,setpaper]=useState(0);
   const [onseside,setoneside]=useState(0);
   const [twoside,settwoside]=useState(0);
   const [noofcopies,setcopies]=useState(0);
   const [noofpap,setpap]=useState(0);
   const [rem,setrem]=useState(0);
   const [dates,setDates]=useState([]);
   const[values,setValues]= useState({username:props.username,roll:props.roll});

   const handledate=(e)=>{
setValues({
  ...values,
[e.target.name]:e.target.value
   });
   }
const submitdate=async()=>{
  try{
    const res=await fetch('http://localhost:8009/udashb/'+props.username+'/'+values.from+'/'+values.to,{
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
   const getUserInfo=async()=>{
    try{
const result=await fetch('http://localhost:8009/udash/'+props.username,{
  method:"GET"
})
const answ=await result.json();
setResult(answ);
answ.map((ele)=>{
  setbun(noofbundles+parseInt(ele.noofbun))
  setpaper(noofpapers+parseInt(ele.nopop))
  setoneside(onseside+parseInt(ele.oneside))
  settwoside(twoside+parseInt(ele.twoside))
  setcopies(noofcopies+parseInt(ele.noofcop))
  setpap(noofpap+parseInt(ele.noofprin))
  setrem(rem+parseInt(ele.remain))
})}
    catch(err){
      console.log(err);
    }
   }
   useEffect(()=>
{
  getUserInfo(); 
},[])



  return (
    <>
      <div className='row'>
      <div className='header col-md-12' style={{backgroundColor:'#333'}} >
      <h1>Welcome Mr.{props.username}</h1>
        </div>
      </div>
      
          <div className='row' style={{ display: 'flex', height: '99vh' }}>
          <CDBSidebar textColor="#fff" backgroundColor="#333"  className='col-md-2'>
         
              <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                
                <h5 className="text-decoration-none" style={{ color: 'inherit' }}>
                  Menu
                </h5>
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
              
          <div className='col-md-9' id='minl'>
          <div className='dashboard'>
            <div className='row'>
              <div className='col-md-2 offset-md-5' style={{padding:'2%',textAlign:'center'}}><h6 className='tab'>DashBoard</h6></div>

            </div>
            <div className='col-md-10 offset-md-1 boxinfo' style={{border:'1px solid black',padding:'5%'}}>
              <div className='row'>
              <div className='col-md-3 grid'>
                <div style={{textAlign:'center',padding:'2%'}}><h5>{noofbundles}</h5>
                <h5>No of Bundles</h5></div>
              </div>
              <div className='col-md-3 grid'>
              <div style={{textAlign:'center',padding:'2%'}}><h5>{noofpapers}</h5>
               <h5>No of Papers</h5></div>
              </div>
              <div className='col-md-3 grid'>
              <div style={{textAlign:'center',padding:'2%'}}><h5>{onseside}</h5><h5>OneSide Copies</h5></div>
              </div>
              <div className='col-md-3 grid'>
              <div style={{textAlign:'center',padding:'2%'}}><h5>{twoside}</h5><h5>TwoSide Copies</h5></div>
              </div>
             
              </div>
              <br/>
              <div className='row'>
              <div className='col-md-3 grid'>
              <div style={{textAlign:'center',padding:'2%'}}><h5>{noofcopies}</h5><h5>No of copies</h5></div>
              </div>
              <div className='col-md-3 grid'>
              <div style={{textAlign:'center',padding:'2%'}}><h5>{noofpap}</h5><h5>No of Papers(Remaining)</h5></div>
              </div>
              <div className='col-md-3 grid'>
              <div style={{textAlign:'center',padding:'2%'}}><h5>{rem}</h5><h5>Remaining Papers</h5></div>
              </div>
              </div>

            </div>
            <br/><br/>
          
          </div>
          <div className='col-md-10 offset-md-1 boxinfo'style={{border:'1px solid black'}}>
          <div className="row">
          <div className='col-md-2 offset-md-5' style={{padding:'2%',textAlign:'center'}}><h6 style={{backgroundColor:'red',color:'white',padding:'3px'}}>Reports</h6></div>
          </div>
          <div  >
          
            
            <div className="row 3">
              <div className='col-md-3 offset-md-3' >
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
                      <div className='col-md-2 offset-md-10'><Button variant="primary" className='btn btn-md btn-success' onClick={submitdate}>
        Submit
        </Button>
  
        <Modal show={show} onHide={handleClose} width={'20%'}>
          <Modal.Header closeButton>
            <Modal.Title>Realted Content tothe search option</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='App tbl-container'>
                    <div className='tbl-fixed' style={{height:'auto'}}>
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
          
          
        </div>
<br/>
        </div>
       
      </div>
  

    </>  
      
  )
}

export default Udashboard;