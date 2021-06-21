import React, { FC, useEffect, useState } from 'react';
import { IPowerOfAttorneyWithNotariusData } from '../../lib/types';
import { getPowerOfAttorneyBySerialNumber } from '../../dal/powerOfAttorney';
import { useParams } from 'react-router-dom';

interface FormData {
  series: string,
  number: number
}

export const PowerOfAttorney: FC<Partial<FormData>> = (props) => {
  let { series, number } = useParams<{ series: string, number: string }>();
  if (props.number && props.series) {
    series = props.series;
    number = String(props.number);
  }
  const [ PoA, setPoA ] = useState<IPowerOfAttorneyWithNotariusData | null>(null);

  useEffect(() => {
    (async () => {
      setPoA(await getPowerOfAttorneyBySerialNumber(series, Number(number)));

    })();
  }, [series, number]);
  return (
    <>
      <h2>Довіреність</h2>

      <div className='poa-container'>
        <div>
          <span>Зареєстрував: </span><span>{ PoA?.notarius.fullName }</span>
        </div>
        <hr/>
        <div>
          <span>Серія: </span><span>{ PoA?.series }</span>
        </div>
        <div>
          <span>Номер: </span><span>{ PoA?.number }</span>
        </div>
        <div>
          <span>Кому видана: </span><span>{ PoA?.issuedTo }</span>
        </div>
        <div>
          <span>Ідентифікаційний номер: </span><span>{ PoA?.taxNumber }</span>
        </div>
        <div>
          <span>Дійсна до: </span><span>{ PoA?.validUntil }</span>
        </div>
        <div>
          <span>Статус: </span><span>{ PoA?.active ? 'Активний' : 'Закінчений' }</span>
        </div>
        <div>
          <span>Додаткова інформація: </span><span>{ PoA?.additionalInfo }</span>
        </div>
      </div>
    </>
  );
};
