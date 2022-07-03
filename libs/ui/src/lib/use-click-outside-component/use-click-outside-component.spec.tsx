import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useClickOutsideComponent from './use-click-outside-component';

describe('useClickOutsideComponent', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useClickOutsideComponent());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
