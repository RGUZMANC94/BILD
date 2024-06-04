import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';

const useSaveUser = (user) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userState);
  const userInfoEmpty = Object.values(userInfo).some((x) => x === '');

  useMemo(() => {
    if (userInfoEmpty) {
      dispatch(setUser(user));
    }
  }, []);
};

export default useSaveUser;
