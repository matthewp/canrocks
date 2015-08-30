import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './search-form.less!';
import template from './search-form.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the search-form component'
    }
  }
});

export default Component.extend({
  tag: 'search-form',
  viewModel: ViewModel,
  template
});