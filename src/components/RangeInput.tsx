import React from 'react';

interface Props {
  onChangeMin: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMax: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RangeInput = (props: Props) => {
  return (
    <>
      <input type={'number'} placeholder={'min'} onChange={props.onChangeMin} />
      <input type={'number'} placeholder={'max'} onChange={props.onChangeMax} />
    </>
  );
};
