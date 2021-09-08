import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Memo from '../Memo';

describe('Memo', () => {
  let component: renderer.ReactTestRenderer;
  let tree: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null;

  it('should match to snapshot', () => {
    act(() => {
      component = renderer.create(<Memo memo={''} onMemoChanged={() => {}} editable={true} />);
      tree = component.toJSON();
    });

    expect(tree).toMatchSnapshot();
  });

  // it('should match to memo props', async () => {
  //   act(() => {
  //     const component = renderer.create(<Memo memo={'memomemo'} onMemoChanged={value => value} editable={true} />);
  //     const textarea = component.root.findByProps({ id: 'memo' })
  //     expect(textarea.props.value).toStrictEqual('memomemo');
  //     expect(textarea.props.readOnly).toBeFalsy();
  //
  //     textarea.props.onChange({ currentTarget: { value: 'mome' } });
  //     expect(textarea.props.value).toStrictEqual('mome');
  //   });
  // });
});
