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
const Getquery=(props)=>{
  return(
    <tr>
      <td>{props.query}</td>
      <td>{props.status}</td>
    </tr>
  )
}
const Ureports=(props)=>{
    const active={
        color:'white'
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [queryre,setQueryres]=useState([]);
    const queryres=async()=>{
     try{
       const res=await fetch('http://localhost:8009/querys/'+props.username,{
         method:'GET'
       })
      
       const dat=await res.json();
       setQueryres(dat);
    
     }
     catch(err){
       console.log(err);
     }
    }
const [query,setQuery]=useState({username:props.username});
const handlequery=(e)=>{
  setQuery({
    ...query,
    [e.target.name]:e.target.value
  })
}
const submitquery=async(e)=>{
try{
  document.getElementById("query").value=" ";
  e.preventDefault();
const response=await fetch('http://localhost:8009/query',{
method:'POST',
body:JSON.stringify(query),
headers:{
  "Content-Type":"application/json"
}
})
}catch(err){
  console.log(err);
}
}


    const[values,setValues]= useState({username:props.username,roll:props.roll});
    const [results,setresults]=useState([])
const getUser=async()=>
{
  try{
    const response= await fetch('http://localhost:8009/usersg/'+props.username,{
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
 
})

    const handleSubmit=async()=>{
       handleClose()
      try{
   const response=await fetch("http://localhost:8009/usersp",{
    method:"POST",
    body:JSON.stringify(values),
    headers:{
       "Content-Type":"application/json"
 
    } 
   });
   console.log(response);
      }catch(err){
       console.log('err');
      }
      handleClose();
   }
   
    const handleChange = (event)=>{
      setValues({
          ...values,
          [event.target.name]: event.target.value,
               });
}

    return(
        <>
      <div className='header row' style={{backgroundColor:'#333',width:'101%'}}>
        <div className='col-md-12'>
        <h1>Resource Allocator</h1>
        </div>
        </div>
       
        <div style={{ display: 'flex', height: '99vh',width:'auto' }}>
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

              
            </CDBSidebar >
             
              <div className='col-md-9' >
          <br/>
          <div className="row" >
            <div className='col-md-2 offset-md-5'>
              <h4 className='option' style={{textAlign:'center'}}>Reports</h4>
            </div>
          </div>

          <div className='col-md-2 offset-md-10'>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add the Data into the Fields</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form className='form-wrapper'>
                <div className='userid'>
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>Date</label><br/>
                    <input  type="date" name="date" onChange={handleChange}  style={{width:'75%'}} />
                    
                </div><br/>
                <div className="machineid">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>MachineId</label><br/>
                    <input  type='text' name="machineid" onChange={handleChange}  style={{width:'75%'}} />
                    </div><br/>
                <div className="college">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>College</label><br/>
                    <input  type="text"  name="college" onChange={handleChange}  style={{width:'75%'}} />
                    </div><br/>
                <div className="location">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>No Of Bundles</label><br/>
                    <input  type="number" name="noofbun" onChange={handleChange}  style={{width:'75%'}}/>
                    </div><br/>
                
                <div className="typeofwork">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>No of papers</label><br/>
                    <input  type="number" name="nopop"onChange={handleChange}  style={{width:'75%'}} />
                    </div><br/>
                    <div className="typeofmaterial">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>No of Copies</label><br/>
                    <input  type="number" name="noofcop" onChange={handleChange}  style={{width:'75%'}}/>
                    </div><br/>
                    <div className="machinereading">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>OneSide Copies</label><br/>
                    <input  type="number" name="oneside" onChange={handleChange}  style={{width:'75%'}} />
                    </div><br/>
                    <div className="Amount">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>TwoSide Copies</label><br/>
                    <input  type="number" name="twoside" onChange={handleChange}  style={{width:'75%'}} />
                    </div><br/>
                    <div className="remarks">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>No of Papers(print)</label><br/>
                    <input  type="number" name="noofprin" onChange={handleChange}  style={{width:'75%'}}/>
                    </div><br/>
                    <div className="Date">
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>Remaining Papers</label><br/>
                    <input  type="number" name="remain" onChange={handleChange}  style={{width:'75%'}} />
                    </div><br/>
            
            </form>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
       
          <br/>
          <div className="container" style={{borderRadius:'10px',boxShadow:'5px 5px 4px',width:'94%',marginLeft:'8%'}}>
            <div className="row 6" >
            <div className='collen' style={{paddingTop:'2%'}}><center><h3>Machine Reports</h3></center>
            <Button variant="primary" className='btn btn-md btn-info' style={{float:'right'}} onClick={handleShow}>
          Add
        </Button><br/><br/>
            </div>

            <br/>
                  <div className='App tbl-container'>
                    <div className='tbl-fixed' style={{height:'26vh'}}>
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
             <br/>
              
            </div>
            </div>
            <div className='row'>
           <div className='col-md-4 offset-md-5' style={{padding:'2%'}}>
           <h3 style={{textAlign:'center',padding:'3%',backgroundColor:'red',color:'white',borderRadius:'10px'}}>Raise a Query</h3>
           </div>
          <div className='row'>
          <div className='col-md-8 offset-md-3 boxinfo'>
            <form className='form-wrapper'>
            <div className="machineid" style={{paddingTop:'2%',textAlign:'center'}}>
                    <label  style={{fontSize:'20px'  ,fontWeight:'600'}}>Report Query</label><br/>
                    <textarea placeholder='Enter Your Query' name='query' rows="3" cols="55" id="query" required onChange={handlequery}></textarea>
                    </div><br/>
                    <div className='row'>
                      <div className='col-md-2 offset-md-5'><button className='btn btn-success' onClick={submitquery}>Submit</button></div>
                    </div>
                    <br/>
            </form>
           </div>
          
         

          </div>
   
 </div>
          </div>
         
        </div>
  
        </>
       
      
    )

}
export default Ureports;