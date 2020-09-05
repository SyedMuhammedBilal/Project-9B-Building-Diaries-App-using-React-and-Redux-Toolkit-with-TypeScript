import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import http from '../../Server/Api';
import { Diary } from '../../Interfaces/diary.interface';
import { addDiary } from './diariesSlice';
import Swal from 'sweetalert2';
import { setUser } from '../auth/userSlice';
import DiaryTile from './DiaryTitle';
import { User } from '../../Interfaces/user.interface';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import DiaryEntriesList from './DiariesEntriesList';
import { useAppDispatch } from '../../Store/store';
import dayjs from 'dayjs';
import './Diary.css'

const Diaries: FC = () => {
  const dispatch = useAppDispatch();
  const diaries = useSelector((state: RootState) => state.diaries);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
        http.get<null, Diary[]>(`diaries/${user.id}`).then((data) => {
          if (data && data.length > 0) {
            const sortedByUpdatedAt = data.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(addDiary(sortedByUpdatedAt));
          }
        });
      }
    };
    fetchDiaries();
  }, [dispatch, user]);

  const createDiary = async () => {
    const result: any = await Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next →',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    }).queue([
      {
        titleText: 'Diary title',
        input: 'text',
      },
      {
        titleText: 'Private or public diary?',
        input: 'radio',
        inputOptions: {
          private: 'Private',
          public: 'Public',
        },
        inputValue: 'private',
      },
    ]);
    if (result.value) {
      const { value } = result;
      const {
        diary,
        user: _user,
      } = await http.post<Partial<Diary>, { diary: Diary; user: User }>('/diaries/', {
        title: value[0],
        type: value[1],
        userId: user?.id,
      });
      if (diary && user) {
        dispatch(addDiary([diary] as Diary[]));
        dispatch(addDiary([diary] as Diary[]));
        dispatch(setUser(_user));
        return Swal.fire({
          titleText: 'All done!',
          confirmButtonText: 'OK!',
        });
      }
    }
    Swal.fire({
      titleText: 'Cancelled',
    });
  };

  return (
    <div style={{ padding: '1em 0.4em' }}>
      <Switch>
        <Route exact path="/diary/:id">
          <DiaryEntriesList />
        </Route>
        <Route path="/">
          <h1 style={{fontSize: '39px'}}>Diaries App</h1>
          <br />
          <button className="create-btn" onClick={createDiary}>Create New</button>
          {diaries.map((diary, idx) => (
            <DiaryTile key={idx} diary={diary} />
          ))}
        </Route>
      </Switch>
    </div>
  );
};

export default Diaries;