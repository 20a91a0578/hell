import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { FaUser} from "react-icons/fa";
import { useEffect } from 'react';
import CanvasJSReact from '../canvasjs.react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Home = (props) => {
  const [result,setResult]=useState([])
  const [noofbundles,setbun]=useState(0);
  const [noofpapers,setpaper]=useState(0);
  const [onseside,setoneside]=useState(0);
  const [twoside,settwoside]=useState(0);
  const [noofcopies,setcopies]=useState(0);
  const [noofpap,setpap]=useState(0);
  const [rem,setrem]=useState(0);
//   const getUserInfo=async()=>{
//     try{
// const result=await fetch('http://localhost:8009/dashup',{
//   method:"GET"
// })
// const answ=await result.json();
// setResult(answ);
// var size=answ.length;

// for(let i=0;i<size;i++){
//   alert(i);
//   setbun(noofbundles+parseInt(answ[i].noofbun))
//   setpaper(noofpapers+parseInt(answ[i].nopop))
//   setoneside(onseside+parseInt(answ[i].oneside))
//   settwoside(twoside+parseInt(answ[i].twoside))
//   setcopies(noofcopies+parseInt(answ[i].noofcop))
//   setpap(noofpap+parseInt(answ[i].noofprin))
//   setrem(rem+parseInt(answ[i].remain))
  

// }
// }

//     catch(err){
//       console.log(err);
//     }
//    }
function fun(){
  var CanvasJS = CanvasJSReact.CanvasJS;

	var chart = new CanvasJS.Chart("chartContainer",{
		animationEnabled: true,
		title:{
			text: "Column Chart with Reversed X-axis"
		},
		
		data: [{
			type: "column",
			dataPoints: [
				{ x: 10, y: 71 },
				{ x: 20, y: 55 },
				{ x: 30, y: 50 },
				{ x: 40, y: 65 },
				{ x: 50, y: 95 },
				{ x: 60, y: 68 },
			
				]
		}]
	});

	chart.render();


}
const getUserInfo=async()=>{
  try{
const result=await fetch('http://localhost:8009/dashup',{
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
fun(); 
},[])



// useEffect(()=>{

// getUserInfo()},[]);


    return (
  <>
  
      <div className='row'>
      <div className='header col-md-12' style={{backgroundColor:'#333'}}>
        <h1>Resource Allocator</h1>
        
        </div>
      </div>
        
          <div className='row' style={{ display: 'flex', height: '110vh'}}>
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

              
            </CDBSidebar >&nbsp;&nbsp;&nbsp;
             
            <div className='col-md-9' id='minl' >
<div className='dashboard'>
  <div className='row'>
    <div className='col-md-2 offset-md-5' style={{padding:'2%',textAlign:'center'}}><h6 style={{backgroundColor:'crimson',color:'white',padding:'4px',borderRadius:'10px'}}>DashBoard</h6></div>

  </div>
  <div className='col-md-10 offset-md-1 boxinfo' style={{padding:'5%'}}>
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
  <div className='col-md-11 offset-md-1'>
   <div className='row'>
   <div className='col-md-3 offset-md-9'>
      <div className='row'>
        <div className='col-md-6 '>
        <select className='select'>
        <option>Select month</option>
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        
        </select>
        </div>
        
        <div className='col-md-5 offset-md-1 '><button onClick={fun} className='option'> Submit</button></div>
      
        </div>
    </div>
    
   </div>
   <div className='row'>
   <div className='col-md-11 offset-md-0 ' id='chartContainer'>

   </div>
   </div>

  </div>

  {/* <button onClick={Hell}>Cl</button> */}
</div>



</div>
        
          </div>
          
       
       
       
      </>
    )
  }
export default Home;


// <div className='col-md-9' id='minl' >
// <div className='dashboard'>
//   <div className='row'>
//     <div className='col-md-2 offset-md-5' style={{padding:'2%',textAlign:'center'}}><h6 style={{backgroundColor:'crimson',color:'white',padding:'4px',borderRadius:'10px'}}>DashBoard</h6></div>

//   </div>
//   <div className='col-md-10 offset-md-1 boxinfo' style={{padding:'5%'}}>
//     <div className='row'>
//     <div className='col-md-3 grid'>
//       <div style={{textAlign:'center',padding:'2%'}}><h5>{noofbundles}</h5>
//       <h5>No of Bundles</h5></div>
//     </div>
//     <div className='col-md-3 grid'>
//     <div style={{textAlign:'center',padding:'2%'}}><h5>{noofpapers}</h5>
//      <h5>No of Papers</h5></div>
//     </div>
//     <div className='col-md-3 grid'>
//     <div style={{textAlign:'center',padding:'2%'}}><h5>{onseside}</h5><h5>OneSide Copies</h5></div>
//     </div>
//     <div className='col-md-3 grid'>
//     <div style={{textAlign:'center',padding:'2%'}}><h5>{twoside}</h5><h5>TwoSide Copies</h5></div>
//     </div>
   
//     </div>
//     <br/>
//     <div className='row'>
//     <div className='col-md-3 grid'>
//     <div style={{textAlign:'center',padding:'2%'}}><h5>{noofcopies}</h5><h5>No of copies</h5></div>
//     </div>
//     <div className='col-md-3 grid'>
//     <div style={{textAlign:'center',padding:'2%'}}><h5>{noofpap}</h5><h5>No of Papers(Remaining)</h5></div>
//     </div>
//     <div className='col-md-3 grid'>
//     <div style={{textAlign:'center',padding:'2%'}}><h5>{rem}</h5><h5>Remaining Papers</h5></div>
//     </div>
//     </div>

//   </div>
//   <br/><br/>
//   <div className='col-md-11 offset-md-1'>
//    <div className='row'>
//    <div className='col-md-3 offset-md-9'>
//       <div className='row'>
//         <div className='col-md-6 '>
//         <select className='select'>
//         <option>Select month</option>
//         <option>January</option>
//         <option>February</option>
//         <option>March</option>
//         <option>April</option>
        
//         </select>
//         </div>
        
//         <div className='col-md-5 offset-md-1 '><button onClick={fun} className='option'> Submit</button></div>
      
//         </div>
//     </div>
    
//    </div>
//    <div className='row'>
//    <div className='col-md-11 offset-md-0 ' id='chartContainer'>

//    </div>
//    </div>

//   </div>

//   {/* <button onClick={Hell}>Cl</button> */}
// </div>



// </div>