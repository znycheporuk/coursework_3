import React, { FC, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { INotarius } from '../../lib/types';
import { getNotaries, updateNotarius } from '../../dal/notaries';
import { useHistory } from 'react-router-dom';


export const Notaries: FC = () => {

  const [ notaries, setNotaries ] = useState<INotarius[]>([]);
  const history = useHistory();

  const updateAndReloadNotarius = async (notarius: Partial<INotarius>) => {
    await updateNotarius(notarius);
    setNotaries(await getNotaries());
  };

  useEffect(() => {
    (async () => {
      setNotaries(await getNotaries());
    })();
  }, []);

  const columns = [
    {
      title: 'Логін',
      dataIndex: 'username',
      key: 'username',
      align: 'center' as const,
    },
    {
      title: 'ПІБ',
      dataIndex: 'fullName',
      key: 'fullName',
      align: 'center' as const,
    },
    {
      title: 'Назва організації',
      dataIndex: 'organizationName',
      key: 'organizationName',
      align: 'center' as const,
    },
    {
      title: 'Номер сертифікату',
      dataIndex: 'certificateNumber',
      key: 'certificateNumber',
      align: 'center' as const,
    },
    {
      title: 'Статус',
      dataIndex: 'active',
      key: 'active',
      align: 'center' as const,
    },
    {
      title: 'Дії',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center' as const,
    },

  ];
  const data = notaries?.map((notarius) => ({
    key: notarius.id,
    username: notarius.username,
    fullName: notarius.fullName,
    organizationName: notarius.organizationName,
    certificateNumber: notarius.certificateNumber,
    active: notarius.active ? 'Активований' : 'Деактивований',
    actions: <div style={ { justifyContent: 'space-between', display: 'flex', width: '250px' } }>
      <Button onClick={ () => {
        history.push('/update-notarius/' + notarius.id);
      } }>Редагувати</Button>
      { notarius.active
        ? <Button danger
                  onClick={ () => updateAndReloadNotarius({ id: notarius.id, active: false }) }>Деактивувати</Button>
        : <Button type='primary' ghost
                  onClick={ () => updateAndReloadNotarius({ id: notarius.id, active: true }) }>Активувати</Button>
      }
    </div>,
  }));


  return (
    <>
      <h2 style={{margin:'20px 0'}}>Нотаріуси</h2>
      <Table columns={ columns } dataSource={ data } pagination={ { position: [ 'bottomCenter' ] } }
             loading={ !notaries }/>
    </>
  );
};
