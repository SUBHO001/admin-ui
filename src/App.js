import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import MembersTable from './components/MembersTable';

function App() {
  const [members, setMembers] = useState(null);
  const [filteredMembers, setFilteredMembers] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [isError, setIsError] = useState(false);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      );
      setIsError(false);
      // console.log('members->' + JSON.stringify(response.data));
      setMembers(response.data.map((row) => ({ ...row, isChecked: false })));
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (searchString.length > 0) {
      setFilteredMembers(
        members.filter((member) => {
          if (
            member.name.toLowerCase().includes(searchString.toLowerCase()) ||
            member.email.toLowerCase().includes(searchString.toLowerCase()) ||
            member.role.toLowerCase().includes(searchString.toLowerCase())
          ) {
            // console.log('member--->' + JSON.stringify(member));
            return member;
          }
        })
      );
    } else {
      setFilteredMembers(members);
    }
  }, [searchString, members]);

  const handleCheck = (id) => {
    let tempMembers = [...members];
    tempMembers.forEach((member) => {
      if (member.id === id) {
        member.isChecked = !member.isChecked;
      }
    });
    setMembers(tempMembers);
  };

  const handleDelete = (id) => {
    let tempMembers = [...members];
    tempMembers = tempMembers.filter((member) => member.id !== id);
    setMembers(tempMembers);
  };

  const handleDeleteSelected = () => {
    let tempMembers = [...members];
    tempMembers = tempMembers.filter((member) => !member.isChecked);
    setMembers(tempMembers);
  };

  const handleEdit = (row) => {
    let tempMembers = [...members];
    tempMembers = tempMembers.map((member) => {
      if (member.id === row.id) {
        return Object.assign(member, row);
      }
      return member;
    });
    setMembers(tempMembers);
  };

  return (
    <div className='container'>
      <div>
        <input
          className='search-box'
          name='search'
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder='Search by name, email or role'
        />
      </div>
      {isError ? (
        <div className='fallback'>Unable to fetch data at the moment</div>
      ) : (
        filteredMembers && (
          <MembersTable
            members={filteredMembers}
            onCheck={handleCheck}
            onDelete={handleDelete}
            onDeleteSelected={handleDeleteSelected}
            onEdit={handleEdit}
          />
        )
      )}
    </div>
  );
}

export default App;
