import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './component.less!';
import template from './component.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the component-page component'
    }
  }
});

export default Component.extend({
  tag: 'component-page',
  viewModel: ViewModel,
  template
});