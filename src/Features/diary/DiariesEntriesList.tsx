import React, { FC, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import http from '../../Server/Api';
import { Entry } from '../../Interfaces/entry.interface';
import { setEntries } from '../entry/entriesSlice';
import { setCanEdit, setCurrentlyEditing } from '../entry/editorSlice';
import './DiariesEntriesList.css'
import dayjs from 'dayjs';
import { useAppDispatch } from '../../Store/store';

const DiaryEntriesList: FC = () => {
  const { entries } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id != null) {
      http
        .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
        .then(({ entries: _entries }) => {
          if (_entries) {
            const sortByLastUpdated = _entries.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(setEntries(sortByLastUpdated));
          }
        });
    }
  }, [id, dispatch]);

  return (
    <div className="entries">
      <header>
        <Link to="/login" >
          <button className="back-btn">← Go Back</button>
        </Link> 
      </header>
      <ul>
        <div>
          {entries.map((entry: any) => (
            <li
              key={entry.id}
              onClick={() => {
                dispatch(setCurrentlyEditing(entry));
                dispatch(setCanEdit(true));
              }}
            >
              {entry.title}
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default DiaryEntriesList;
