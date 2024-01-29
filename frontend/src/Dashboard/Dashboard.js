import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Pagination, Alert } from 'react-bootstrap';

export default function Dashboard() {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [arr, setArr] = useState([]);
  const [errors, setErrors] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/dashboard' , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(response => {
        setArr(response.data.arr.arr);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setErrors(prevErrors => [...prevErrors, error.message]); 
      });
  }, []);

  const totalPages = Math.ceil(arr.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
          {page}
        </Pagination.Item>
      );
    }
    return buttons;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRows = arr.slice(startIndex, endIndex);

  return (
    <div>
{/* <button onClick={() => {localStorage.removeItem('userData'); localStorage.removeItem('token');}}>
  Click me
</button> */}
      {errors.length > 0 && (
        <Alert variant="danger">
          <ul>
            Unauthorized access Please Login
          </ul>
        </Alert>
      )}
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>
            <th scope='col'>Status</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentRows.map((item, index) => (
            <tr key={index}>
              <td>{item['#']}</td>
              <td>
                <div className='d-flex align-items-center'>
                  <img
                    src={`https://mdbootstrap.com/img/new/avatars/${index + 1}.jpg`}
                    alt=''
                    style={{ width: '45px', height: '45px' }}
                    className='rounded-circle'
                  />
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{item['Name']}</p>
                    <p className='text-muted mb-0'>{item['Email']}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='text-muted mb-0'>{item['DateCreated']}</p> 
              </td>
              <td>{item['Role']}</td>
              <td>
                {item['Status'] === 'Active' ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MDBBadge pill color='white' style={{ marginRight: '5px' }}>
                      <span
                        style={{
                          backgroundColor: 'green',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          display: 'inline-block',
                        }}
                      ></span>
                    </MDBBadge>
                    {item['Status']}
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MDBBadge pill color='white' style={{ marginRight: '5px' }}>
                      <span
                        style={{
                          backgroundColor: 'red',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          display: 'inline-block',
                        }}
                      ></span>
                    </MDBBadge>
                    {item['Status']}
                  </div>
                )}
              </td>
              <td>
                <MDBBtn color='link' rounded size='sm' className='d-flex gap-10'>
                  <img src='https://cdn-icons-png.flaticon.com/512/2698/2698011.png' height={20} width={20} />
                  <img src='https://cdn-icons-png.flaticon.com/512/5974/5974771.png' height={20} width={20} style={{ marginLeft: '10px' }} />
                </MDBBtn>

              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {renderPaginationButtons()}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    </div>
  );
}
