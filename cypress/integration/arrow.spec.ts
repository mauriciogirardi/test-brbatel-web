/// <reference types="cypress"/>

describe('Asserts', () => {
  it('Equality', () => {
    const a = 1;

    expect(a, 'Should be 1').to.be.equal(1);
    expect(a).not.to.be.eq(2);
  });

  it('Truthy', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(true).to.be.true;
    expect(b).to.be.null;
    expect(a).to.be.not.null;
    expect(c).to.be.undefined;
  });

  it('Object Equality', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    expect(obj).to.be.deep.equal({ a: 1, b: 2 });
    expect(obj).eql({ a: 1, b: 2 });
    expect(obj).include({ b: 2 });
    expect(obj).to.have.property('b', 2);
    expect(obj).to.not.be.empty;
  });

  it('Arrays', () => {
    const arr = [1, 2, 3];

    expect(arr).to.have.members([1, 2, 3]);
    expect(arr).to.have.include.members([1, 2]);
  });

  it('Types', () => {
    const num = 1;
    const str = 'string';

    expect(num).to.be.a('number');
    expect(str).to.be.a('string');
    expect({}).to.be.an('object');
  });

  it('String', () => {
    const str = 'String of test';

    expect(str).to.be.eq('String of test');
    expect(str).to.have.length(14);
    expect(str).to.contains('of');
    expect(str).to.match(/of/);
    expect(str).to.match(/^String/);
    expect(str).to.match(/test$/);
    expect(str).to.match(/.{14}/);
    expect(str).to.match(/\w+/);
    expect(str).to.match(/\D+/);
  });

  it('Number', () => {
    const number = 4;
    const floatNumber = 5.365;

    expect(number).to.be.eq(4);
    expect(number).to.be.above(3);
    expect(number).to.be.below(5);
    expect(floatNumber).to.be.eq(5.365);
    expect(floatNumber).to.be.closeTo(5.3, 0.1);
    expect(floatNumber).to.be.above(5);
  });
});
