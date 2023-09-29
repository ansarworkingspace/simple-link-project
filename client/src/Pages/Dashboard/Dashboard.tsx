import React from 'react'
import TextInput from '../../Components/TextInput/TextInput'
import Button from '../../Components/Button/Button'
import '../Dashboard/Dashboard.css'
import axios from 'axios'


const Dashboard = () => {

const [ showUrlAddView,setShowUrlAddView] = React.useState(false)
const [urlPayload,setUrlPayload]=React.useState({
  originalLink:"",
  name:"",
})
const [shortUrl,setShortUrl]=React.useState("")

const postDataToApi = async () =>{
  if(!urlPayload.originalLink){
    alert("please provide original url")
    return
  }
try {
  const {data} = await axios.post(
  "http://localhost:5001/api/url",
  urlPayload
  );
  console.log("data from back end", data)
  setShortUrl(`http://localhost:5001/api/url/${data.urlCode}`)
} catch (error) {
  console.log(error)
}
};

const renderEmptyState = () =>{
  return(
    <div className="dashboard__empty-state">
    <p>You don't have any short url</p>
    <Button
      onClick={() => setShowUrlAddView(true)}
      label="Create a new short url"
      variant="outlined-primary"
    />
    </div>
  );
}

const renderAddNewUrl = () =>{
  return (
<div className="dashboard__add-new">
  <TextInput  label='Original Url' placeholder='https://google.com/jhgdfygew' onChange={(val)=>setUrlPayload({...urlPayload,originalLink:val.toLocaleString()})}/>
  <TextInput label='Name' placeholder='Name' onChange={(val)=>setUrlPayload({...urlPayload,name:val.toLocaleString() })}/>

<div className="dashboard__add-new-actions">
<Button label='Genarate Url' onClick={()=> postDataToApi()}/>
<Button label='Cancel'  onClick={()=>setShowUrlAddView(false)}/>
</div>

 
</div>
  );
}

  return (
    <div className='dashboard'>
     {showUrlAddView?renderAddNewUrl():renderEmptyState()}
     {Boolean(shortUrl) && <h3>{shortUrl}</h3>}
    </div>
  )
}

export default Dashboard
