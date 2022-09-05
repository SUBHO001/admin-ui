import React, { useEffect, useState } from 'react';
import './MembersTable.css';

const MemberRow = ({
  row,
  onRowCheck,
  onRowDelete,
  onRowEdit,
  onClickEdit,
  token,
}) => {
  const initialValues = { ...row };
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState(initialValues);

  useEffect(() => {
    setEditedValues(row);
  }, [row]);

  useEffect(() => {
    token === row.id ? setEditMode(true) : setEditMode(false);
  }, [token, row.id]);

  const handleCheck = () => onRowCheck(row.id);

  const handleDelete = () => onRowDelete(row.id);

  const handleEdit = (e) => {
    if (editMode) {
      const { name, value } = e.target;
      setEditedValues({
        ...editedValues,
        [name]: value,
      });
    }
  };

  const handleCancel = () => {
    setEditedValues(initialValues);
    setEditMode(false);
    onClickEdit(null);
  };

  const handleSave = () => {
    onRowEdit(editedValues);
    setEditMode(false);
    onClickEdit(null);
  };

  const handleEditMode = () => {
    onClickEdit(row.id);
  };

  return (
    <tr className={row.isChecked ? 'selected' : ''}>
      <td>
        <input
          type='checkbox'
          onChange={handleCheck}
          checked={row.isChecked ? 'checked' : ''}
        />
      </td>
      <td>
        <div>
          <input
            className={`data${row.isChecked ? ' selected' : ''}${
              editMode ? ' editable' : ' view'
            }`}
            name='name'
            value={editedValues.name}
            onChange={handleEdit}
          />
        </div>
      </td>
      <td>
        <div>
          <input
            className={`data${row.isChecked ? ' selected' : ''}${
              editMode ? ' editable' : ' view'
            }`}
            name='email'
            value={editedValues.email}
            onChange={handleEdit}
          />
        </div>
      </td>
      <td>
        <div>
          <input
            className={`data${row.isChecked ? ' selected' : ''}${
              editMode ? ' editable' : ' view'
            }`}
            name='role'
            value={editedValues.role}
            onChange={handleEdit}
          />
        </div>
      </td>
      <td>
        <div>
          {editMode ? (
            <>
              <span className='action-icon' onClick={handleSave}>
                save
              </span>
              <span className='action-icon' onClick={handleCancel}>
                close
              </span>
            </>
          ) : (
            <>
              <span className='action-icon' onClick={handleEditMode}>
                edit
              </span>
              <span className='action-icon' onClick={handleDelete}>
                delete
              </span>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MemberRow;
