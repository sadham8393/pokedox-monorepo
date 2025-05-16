import { describe, it, expect } from '@jest/globals';
import * as utils from './index';

describe('utils package', () => {
  it('should have exported members', () => {
    expect(typeof utils).toBe('object');
  });
});

describe('capitalize', () => {
  it('capitalizes the first letter of a string', () => {
    expect(utils.capitalize('pikachu')).toBe('Pikachu');
    expect(utils.capitalize('Bulbasaur')).toBe('Bulbasaur');
    expect(utils.capitalize('cHaRmAnDeR')).toBe('CHaRmAnDeR');
  });
});

describe('formatHeight', () => {
  it('formats height from decimetres to meters', () => {
    expect(utils.formatHeight(7)).toBe('0.7 m');
    expect(utils.formatHeight(10)).toBe('1.0 m');
    expect(utils.formatHeight(25)).toBe('2.5 m');
  });
});

describe('formatWeight', () => {
  it('formats weight from hectograms to kilograms', () => {
    expect(utils.formatWeight(60)).toBe('6.0 kg');
    expect(utils.formatWeight(100)).toBe('10.0 kg');
    expect(utils.formatWeight(123)).toBe('12.3 kg');
  });
});
