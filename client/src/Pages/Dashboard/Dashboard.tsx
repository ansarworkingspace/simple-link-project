import React from 'react'
import moment from 'moment';
import TextInput from '../../Components/TextInput/TextInput'
import Button from '../../Components/Button/Button'
import '../Dashboard/Dashboard.css'

import httpClient from "../../Services/HttpClient";
import Modal from 'react-modal'
import { UrlType } from "../../Types";
import { createUrl, getUrlsForUser,deleteUrlByUrlCode } from "../../Services/UrlServices";
import UrlTable from "../../Components/UrlTable/UrlTable";




const Dashboard = () => {
  const [showUrlAddView, setShowUrlAddView] = React.useState(false);
  const [urlPayload, setUrlPayload] = React.useState({
    originalLink: "",
    name: "",
  });
  // const [shortUrl, setShortUrl] = React.useState("");
  const [userUrlData, setUserUrlData] = React.useState<Array<UrlType>>([]);
  
  const [refreshFlag, setRefreshFlag] = React.useState(false);






  const postDataToApi = async () => {
    if (!urlPayload.originalLink) {
      alert("Please provide original url");
      return;
    }
    await createUrl(urlPayload);
    fetchUrlsForUser();
    setShowUrlAddView(false);
  };

  //Fetch urls for users
  const fetchUrlsForUser = async () => {
    try {
      const urlData = await getUrlsForUser();

      setUserUrlData(urlData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUrlsForUser();
  }, []);



  const renderEmptyState = () => {
    return (
      <div className="dashboard__empty-state">
        <p>You can short your Url Easly with Easy Link</p>
        <Button
          onClick={() => setShowUrlAddView(true)}
          label="Create a new short url"
          variant="outlined-primary"
        />
      </div>
    );
  };




  const renderAddNewUrl = () => {
    return (
      <div className="dashbard__add-new">
        <TextInput
          label="Original Url"
          placeholder="https://google.com/test/12"
          value={urlPayload.originalLink}
          onChange={(val) =>
            setUrlPayload({ ...urlPayload, originalLink: val.toLocaleString() })
          }
        />
        <TextInput
          label="Name"
          value={urlPayload.name}
          placeholder="Online shopping"
          onChange={(val) =>
            setUrlPayload({ ...urlPayload, name: val.toLocaleString() })
          }
        />
        <div className="dashboard__add-new-actions">
          <Button
            label="Generate a short url"
            onClick={() => postDataToApi()}
          />
          <Button
            label="Cancel"
            variant="outlined-secondary"
            onClick={() => setShowUrlAddView(false)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      {showUrlAddView ? renderAddNewUrl() : renderEmptyState()}
      {/* {Boolean(shortUrl) && <h3>{shortUrl}</h3>} */}
    
      <h3>Shortened url list</h3>
      <>
        <UrlTable
          columns={tableColumn}
          rows={userUrlData.map(convertRowDataToTableData)}
        />
      </>
    </div>
  );
};











const tableColumn = [
  { label: "Name", field: "name" },
  { label: "Link", field: "urlCode" },
  { label: "Visit", field: "visitCount" },
  { label: "Added date", field: "createdAt" },
  { label: "Actions", field: "actions", hideLabelinMobile: true },
];

const convertRowDataToTableData = (data: UrlType) => {
  return {
    ...data,
    urlCode: `http://localhost:5001/api/url/${data.urlCode}`,
    createdAt: moment.unix(Number(data.createdAt) / 1000).format("l"),
    actions: renderActions(data),
  };
};






//delete url
// const deleteUrl = async (urlCode: string) => {
//   await deleteUrlByUrlCode(urlCode);
  
  
// };


const deleteUrl = async (urlCode: string) => {
  try {
    await deleteUrlByUrlCode(urlCode);
    // After successful deletion, refresh the page
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};



const renderActions = (data: UrlType): React.ReactNode => {
 
  
 
  return (
    <div
      style={{
        display: "flex",
        maxWidth: 140,
        justifyContent: "space-between",
      }}
    >
   

<Button
        label="Delete"
        variant="outlined-secondary"
        onClick={() => {
          if (
            window.confirm(`Are you sure you want to delete: ${data.name}?`)
          ) {
            deleteUrl(data.urlCode);
          }
        }}
      />


    </div>
  );
};

export default Dashboard;