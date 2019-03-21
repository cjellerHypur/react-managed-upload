import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactManagedUpload from '.'; // get time selection through index.js

Enzyme.configure({ adapter: new Adapter() });

describe('React Managed Upload Component', () => {
    test('renders', () => {
        const wrapper = shallow(<ReactManagedUpload />);
        expect(wrapper.exists()).toBe(true);
    });
    /*
    test('renders normal container', () => {
        const wrapper = shallow(<ReactManagedUpload />);
        wrapper.find('input').simulate('click');
        expect(wrapper.find('.ReactTime-container-normal').exists()).toBe(true);
    });

    test('renders all 6 buttons', () => {
        const wrapper = shallow(<ReactManagedUpload />);
        wrapper.find('input').simulate('click');
        expect(wrapper.find('.ReactTime-arrow-button')).toHaveLength(6);
    });

    test('renders with meridian input', () => {
        const wrapper = shallow(<ReactManagedUpload />);
        wrapper.find('input').simulate('click');
        expect(wrapper.find('#meridian').exists()).toBe(true);
    });

    test('modal stays open on second input click', () => {
        const wrapper = shallow(<ReactManagedUpload />);
        wrapper.find('input').simulate('click');
        wrapper.find('input').at(0).simulate('click');
        expect(wrapper.find('#meridian').exists()).toBe(true);
    });

    test('close "x" removes modal', () => {
        const wrapper = shallow(<ReactManagedUpload />);
        wrapper.find('input').simulate('click');
        wrapper.find('.ReactTime-close').simulate('click');
        expect(wrapper.find('#ReactTime-picker').exists()).toBe(false);
    });

    test('pressing "done" sets input value', () => {
        const wrapper = shallow(<ReactManagedUpload />);
        wrapper.find('input').simulate('click');
        const currentHours = wrapper.find({ name: 'currentHours' }).props().value;
        const currentMinutes = wrapper.find({ name: 'currentMinutes' }).props().value;
        const meridian = wrapper.find({ name: 'meridian' }).props().value;
        wrapper.find('.ReactTime-done-button').simulate('click');
        const inputValue = wrapper.find('input').props().value;
        let hourString = currentHours;
        let minString = currentMinutes;
        if (currentHours < 10) {
            hourString = `0${currentHours}`;
        }
        if (currentMinutes < 10) {
            minString = `0${currentMinutes}`;
        }
        const expectedString = `${hourString}:${minString} ${meridian}`;
        expect(inputValue).toBe(expectedString);
    });

    test('pressing "reset" clears input value', () => {
        const wrapper = shallow(<ReactManagedUpload />);
        wrapper.find('input').simulate('click');
        wrapper.find('.ReactTime-done-button').simulate('click');
        wrapper.find('input').simulate('click');
        wrapper.find('.ReactTime-reset-button').simulate('click');
        const inputValue = wrapper.find('input').at(0).props().value.toString();
        expect(inputValue).toBe('');
    });

    test('up hours arrow adds to previous value', () => {
        const wrapper = shallow(<ReactManagedUpload />);
        wrapper.find('input').simulate('click');
        const currentHours = wrapper.find({ name: 'currentHours' }).props().value;
        wrapper.find('.ReactTime-arrow-button').at(0).simulate('click');
        const newHours = wrapper.find({ name: 'currentHours' }).props().value;

        if (currentHours === 12) {
            expect(newHours).toBe(1);
        } else {
            expect(newHours).toBeGreaterThan(currentHours);
        }
    });

    test('down hours arrow subtracts from previous value', () => {
        const wrapper = shallow(<ReactManagedUpload />);
        wrapper.find('input').simulate('click');
        const currentHours = wrapper.find({ name: 'currentHours' }).props().value;
        wrapper.find('.ReactTime-arrow-button').at(1).simulate('click');
        const newHours = wrapper.find({ name: 'currentHours' }).props().value;

        if (currentHours === 1) {
            expect(newHours).toBe(12);
        } else {
            expect(newHours).toBeLessThan(currentHours);
        }
    });

    test('up mins arrow adds to previous value', () => {
        const wrapper = shallow(<ReactManagedUpload />);
        wrapper.find('input').simulate('click');
        const currentMinutes = wrapper.find({ name: 'currentMinutes' }).props().value;
        wrapper.find('.ReactTime-arrow-button').at(2).simulate('click');
        const newMinutes = wrapper.find({ name: 'currentMinutes' }).props().value;

        if (currentMinutes === 59) {
            expect(newMinutes).toBe(0);
        } else {
            expect(newMinutes).toBeGreaterThan(currentMinutes);
        }
    });

    test('up mins arrow loops to 0 at 59 mins', () => {
        const wrapper = shallow(<ReactManagedUpload />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentMinutes' }).simulate('change', { target: { value: '59' } });
        wrapper.find('.ReactTime-arrow-button').at(2).simulate('click');
        const newMinutes = wrapper.find({ name: 'currentMinutes' }).props().value;
        expect(newMinutes).toBe(0);
    });
    */
});
