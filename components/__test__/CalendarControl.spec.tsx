import React from 'react';
import renderer, { act } from 'react-test-renderer';
import CalendarControl from "../CalendarControl";

describe('CalendarControl', () => {
  let component: renderer.ReactTestRenderer;
  let tree: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null;

  it('should match to snapshot', () => {
    const date = new Date(2021, 12, 21);

    act(() => {
      component = renderer.create(<CalendarControl date={date} onDateChanged={() => {}} />);
      tree = component.toJSON();
    });

    expect(tree).toMatchSnapshot();
  });
});
