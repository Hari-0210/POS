import React, {useState, useEffect} from 'react';
import APIKit from '../../utilities/APIKIT';
import { URLS } from '../../utilities/URLS';


const [customerList, setCustomerList] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    customerID: "",
    name: "",
    mobileNo: "",
    city: "",
  });
const getCustomer = async (data = "") => {
    await APIKit.get(URLS.getCustomer).then((res) => {
      if (res.data.status === 200) {
        setCustomerList(res.data.data);
      } else {
      }
    });
  };
  useEffect(() => {
    getCustomer();
  }, []);
function DummySales() {
    return (
        <div>
            
        </div>
    );
}

export default DummySales;