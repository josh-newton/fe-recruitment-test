import { h } from 'preact';
import App from '../src/components/App';

// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme';

describe('Initial Test of App', () => {
	test('App renders', () => {
		const context = shallow(<App />);
		expect(context.find('.App').exists()).toBeTruthy();
	});
});
