import {getStringType, TRANSACTION, ADDRESS, BLOCK } from 'utils/search-utils';

describe('getStringType', () => {
  it('Classifies addresses correctly.', () => {
    expect(getStringType('0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6'))
    .toBe(ADDRESS);
    expect(getStringType('0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6'))
      .toBe(ADDRESS);
  });
  it('Classifies transactions correctly.', () => {
    expect(getStringType('0x54ec68e8c757f287d7c4a912027c7542421a35033b7bce1dc9b376ae881d7509'))
      .toBe(TRANSACTION);
    expect(getStringType('54ec68e8c757f287d7c4a912027c7542421a35033b7bce1dc9b376ae881d7509'))
      .toBe(TRANSACTION);
  });
  it('Classifies blocks correctly.', () => {
    expect(getStringType('317030'))
      .toBe(BLOCK);
  });
});
