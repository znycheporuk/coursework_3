import React, { FC, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { IPowerOfAttorneyWithNotariusData } from '../../lib/types';
import { useHistory } from 'react-router-dom';
import { getPowersOfAttorney, updatePowerOfAttorney } from '../../dal/powerOfAttorney';
import { useRecoilValue } from 'recoil';
import { userIdSelector } from '../../recoil/auth';


export const PowerOfAttorneyTable: FC = () => {

  const [ PoAs, setPoAs ] = useState<IPowerOfAttorneyWithNotariusData[]>([]);
  const history = useHistory();
  const id = useRecoilValue(userIdSelector);

  const updateAndReloadPoA = async (PoA: Partial<IPowerOfAttorneyWithNotariusData>) => {
    await updatePowerOfAttorney(PoA);
    const poas = await getPowersOfAttorney();
    setPoAs(poas.filter(poa => poa.notariusId === id));
  };

  const openPoAPage = (series: string, number: number) => {
    history.push('/power-of-attorney/' + series + '/' + number);
  };

  useEffect(() => {
    (async () => {
      const poas = await getPowersOfAttorney();
      setPoAs(poas.filter(poa => poa.notariusId === id));
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
    issuedTo: PoA.issuedTo,
    taxNumber: PoA.taxNumber,
    validUntil: PoA.validUntil,
    actions: PoA.active ?
      <Button danger onClick={ () => updateAndReloadPoA({ ...PoA, active: false }) }>Припинити</Button> : 'Закінчено',
  }));


  return (
    <>
      <h2 style={ { margin: '20px 0' } }>Довіреності</h2>
      <Table columns={ columns } dataSource={ data } pagination={ { position: [ 'bottomCenter' ] } }
             loading={ !PoAs }/>
    </>
  );
};
