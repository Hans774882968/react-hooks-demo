import React, { useEffect, useState } from 'react';
import styles from './Home.module.less';
import { Button } from 'antd';

function Home () {
  const [value, setValue] = useState(0);
  const add = () => {
    setValue(value + 1);
  };
  const minus = () => {
    setValue(value - 1);
  };
  useEffect(() => {
    document.title = `value的值为${value}`;
  }, [value]);
  return (
    <div>
      <p className={styles.value}>{value}</p>
      <Button type='primary' onClick={add}>加1</Button>
      <Button type='primary' onClick={minus}>减1</Button>
    </div>
  );
}

export default Home;
