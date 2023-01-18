import React, { FC, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Pagination } from 'antd';

import { RootState } from '../../store/root-reducer';
import { getContent as swichC } from '../../services/servic-api';
import { GetActionType } from '../../store/action';

import classes from './Pagination.module.scss';

interface PaginationType {
  totalItems: number;
}

const Paginations: FC<PaginationType> = ({ totalItems }) => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const onChange = (page: number) => {
    dispatch({ type: GetActionType.PAGINATION, offset: page * 10 });
    setCurrent(page);
  };

  return (
    <Pagination
      current={current}
      total={totalItems}
      onChange={onChange}
      showSizeChanger={false}
      className={classes['ant-pagination']}
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return { state };
};

const mapDispatchToProps = {
  getContent: swichC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginations);
