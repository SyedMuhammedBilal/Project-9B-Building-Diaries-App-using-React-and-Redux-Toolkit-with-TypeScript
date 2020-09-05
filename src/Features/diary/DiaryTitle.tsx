import React, { FC, useState } from 'react';
import { Diary } from '../../Interfaces/diary.interface';
import http from '../../Server/Api';
import { setActiveDiaryId, setCanEdit, setCurrentlyEditing } from '../entry/editorSlice';
import { updateDiary } from './diariesSlice';
import { showAlert } from '../../util';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../Store/store';
import './DiaryTitle.css'

interface Props {
  diary: Diary
}

const DiaryTile: FC<Props> = (props) => {
  const [diary, setDiary] = useState(props.diary);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const totalEntries = props.diary?.entryIds?.length;

  const saveChanges = () => {
    http
      .put<Diary, Diary>(`/diaries/${diary.id}`, diary)
      .then((diary) => {
        if (diary) {
          dispatch(updateDiary(diary));
          showAlert('Saved!', 'success');
        }
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  return (
    <div className="diary-title-in">
      <h2
        className="title"
        title="Click to edit"
        onClick={() => setIsEditing(true)}
        style={{
          cursor: 'pointer',
        }}
      >
        {isEditing ? (
          <input
            value={diary.title}
            onChange={(e) => {
              setDiary({
                ...diary,
                title: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                saveChanges();
              }
            }}
          />
        ) : (
          <span>{diary.title}</span>
        )}
      </h2>
      <br/>
      <p className="subtitle">{totalEntries ?? '0'} saved entries</p>
      <div style={{ display: 'flex', marginTop: '4px' }}>
        <button
          className="entry-btn"
          onClick={() => {
            dispatch(setCanEdit(true));
            dispatch(setActiveDiaryId(diary.id as string));
            dispatch(setCurrentlyEditing(null));
          }}
        >
          Add New Entry
        </button>
        <Link to={`diary/${diary.id}`} style={{ width: '100%' }}>
          <button className="va-btn">
            View all →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DiaryTile;