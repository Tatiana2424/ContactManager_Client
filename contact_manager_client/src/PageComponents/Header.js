import React, { useEffect, useState } from "react";
import { Table } from 'antd';

  
  
export const Header = () => {

return(
<div>

<div className="header_container">
    <div className="header_title">
    Contact Manager
    </div>
   
  </div>
  <div className="table_component">
  {/* <Table columns={columns} dataSource={contactData} onChange={onChange} /> */}
  </div>
</div>

)   
};