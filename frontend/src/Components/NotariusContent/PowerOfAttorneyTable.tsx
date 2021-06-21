import React, { FC, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { useRecoilValue } from 'recoil';
import { INotarius, IPowerOfAttorneyWithNotariusData } from '../../lib/types';
import { updateNotarius } from '../../dal/notaries';
import { roleSelector } from '../../recoil/auth';
import { useHistory } from 'react-router-dom';
import { getPowersOfAttorney } from '../../dal/powerOfAttorney';


export const PowerOfAttorneyTable: FC = () => {

  const [ PoAs, setPoAs ] = useState<IPowerOfAttorneyWithNotariusData[]>([]);
  const role = useRecoilValue(roleSelector);
  const history = useHistory();

  const updateAndReloadNotarius = async (notarius: Partial<INotarius>) => {
    await updateNotarius(notarius);
    setPoAs(await getPowersOfAttorney());
  };

  const openPoAPage = (series: string, number: number) => {
    history.push('/power-of-attorney/' + series + '/' + number);
  };

  useEffect(() => {
    (async () => {
      setPoAs(await getPowersOfAttorney());
    })();
  }, []);

  const columns = [
    {
      title: 'Серія',
      dataIndex: 'series',
      key: 'series',
      align: 'center' as const,
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
      align: 'center' as const,
    },
    {
      title: 'Ким видана',
      dataIndex: 'notariusName',
      key: 'notariusName',
      align: 'center' as const,
    },
    {
      title: 'Кому видана',
      dataIndex: 'issuedTo',
      key: 'issuedTo',
      align: 'center' as const,
    },
    {
      title: 'ІПН отримувача',
      dataIndex: 'taxNumber',
      key: 'taxNumber',
      align: 'center' as const,
    },
    {
      title: 'Дійсна до',
      dataIndex: 'validUntil',
      key: 'validUntil',
      align: 'center' as const,
    },
    {
      title: 'Дії',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center' as const,
    },

  ];
  const data = PoAs?.map((PoA) => ({
    key: PoA.id,
    series: <Button type='link' onClick={ () => openPoAPage(PoA.series, PoA.number) }>{ PoA.series }</Button>,
    number: <Button type='link' onClick={ () => openPoAPage(PoA.series, PoA.number) }>{ PoA.number }</Button>,
    notariusName: PoA.notarius.fullName,
    issuedTo: PoA.issuedTo,
    taxNumber: PoA.taxNumber,
    validUntil: PoA.validUntil,
    actions: PoA.active ? <Button danger>Скасувати</Button> : 'Скасовано',
  }));


  return (
    <>
      <h2 style={ { margin: '20px 0' } }>Довіреності</h2>
      <Table columns={ columns } dataSource={ data } pagination={ { position: [ 'bottomCenter' ] } }
             loading={ !PoAs }/>
    </>
  );
};
