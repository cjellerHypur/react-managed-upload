import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactTimeSelection from '.'; // get time selection through index.js

Enzyme.configure({ adapter: new Adapter() });

describe('React Time Selection Component', () => {
    /* 12 HOUR TIME TESTS */
    test('renders', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        expect(wrapper.exists()).toBe(true);
    });

    test('renders normal container', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        expect(wrapper.find('.ReactTime-container-normal').exists()).toBe(true);
    });

    test('renders all 6 buttons', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        expect(wrapper.find('.ReactTime-arrow-button')).toHaveLength(6);
    });

    test('renders with meridian input', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        expect(wrapper.find('#meridian').exists()).toBe(true);
    });

    test('modal stays open on second input click', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        wrapper.find('input').at(0).simulate('click');
        expect(wrapper.find('#meridian').exists()).toBe(true);
    });

    test('close "x" removes modal', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        wrapper.find('.ReactTime-close').simulate('click');
        expect(wrapper.find('#ReactTime-picker').exists()).toBe(false);
    });

    test('pressing "done" sets input value', () => {
        const wrapper = shallow(<ReactTimeSelection />);
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
        const expectedString = `${hourString} : ${minString} ${meridian}`;
        expect(inputValue).toBe(expectedString);
    });

    test('pressing "reset" clears input value', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        wrapper.find('.ReactTime-done-button').simulate('click');
        wrapper.find('input').simulate('click');
        wrapper.find('.ReactTime-reset-button').simulate('click');
        const inputValue = wrapper.find('input').at(0).props().value.toString();
        expect(inputValue).toBe('');
    });

    test('up hours arrow adds to previous value', () => {
        const wrapper = shallow(<ReactTimeSelection />);
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
        const wrapper = shallow(<ReactTimeSelection />);
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
        const wrapper = shallow(<ReactTimeSelection />);
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
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentMinutes' }).simulate('change', { target: { value: '59' } });
        wrapper.find('.ReactTime-arrow-button').at(2).simulate('click');
        const newMinutes = wrapper.find({ name: 'currentMinutes' }).props().value;
        expect(newMinutes).toBe(0);
    });

    test('down mins arrow subtracts from previous value', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        const currentMinutes = wrapper.find({ name: 'currentMinutes' }).props().value;
        wrapper.find('.ReactTime-arrow-button').at(3).simulate('click');
        const newMinutes = wrapper.find({ name: 'currentMinutes' }).props().value;

        if (currentMinutes === 0) {
            expect(newMinutes).toBe(59);
        } else {
            expect(newMinutes).toBeLessThan(currentMinutes);
        }
    });

    test('down mins arrow loops to 59 at 0 mins', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentMinutes' }).simulate('change', { target: { value: '0' } });
        wrapper.find('.ReactTime-arrow-button').at(3).simulate('click');
        const newMinutes = wrapper.find({ name: 'currentMinutes' }).props().value.toString();
        expect(newMinutes).toBe('59');
    });

    test('up meridian arrow changes meridian', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        const meridian = wrapper.find({ name: 'meridian' }).props().value.toString();
        wrapper.find('.ReactTime-arrow-button').at(4).simulate('click');
        const newMeridian = wrapper.find({ name: 'meridian' }).props().value.toString();

        if (meridian === 'AM') {
            expect(newMeridian).toBe('PM');
        } else {
            expect(newMeridian).toBe('AM');
        }
    });

    test('down meridian arrow changes meridian', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        const meridian = wrapper.find({ name: 'meridian' }).props().value.toString();
        wrapper.find('.ReactTime-arrow-button').at(5).simulate('click');
        const newMeridian = wrapper.find({ name: 'meridian' }).props().value.toString();

        if (meridian === 'AM') {
            expect(newMeridian).toBe('PM');
        } else {
            expect(newMeridian).toBe('AM');
        }
    });

    test('up hours arrow adds to previous value at 12 hours', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentHours' }).simulate('change', { target: { value: '12' } });
        wrapper.find('.ReactTime-arrow-button').at(0).simulate('click');
        const newHours = wrapper.find({ name: 'currentHours' }).props().value;
        expect(newHours).toBe(1);
    });

    test('down hours arrow loops to 12 at hour 1', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentHours' }).simulate('change', { target: { value: '1' } });
        wrapper.find('.ReactTime-arrow-button').at(1).simulate('click');
        const newHours = wrapper.find({ name: 'currentHours' }).props().value.toString();
        expect(newHours).toBe('12');
    });

    test('direct input of hour', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentHours' }).simulate('change', { target: { value: '6' } });
        const currentHours = wrapper.find({ name: 'currentHours' }).props().value.toString();
        expect(currentHours).toBe('6');
    });

    test('direct input of hour greater than 12', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentHours' }).simulate('change', { target: { value: '15' } });
        const currentHours = wrapper.find({ name: 'currentHours' }).props().value.toString();
        expect(currentHours).toBe('12');
    });

    test('direct input of hour less than 1', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentHours' }).simulate('change', { target: { value: '0' } });
        const currentHours = wrapper.find({ name: 'currentHours' }).props().value.toString();
        expect(currentHours).toBe('1');
    });

    test('direct input of minute', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentMinutes' }).simulate('change', { target: { value: '26' } });
        const currentMinutes = wrapper.find({ name: 'currentMinutes' }).props().value.toString();
        expect(currentMinutes).toBe('26');
    });

    test('direct input of minute greater than 59', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentMinutes' }).simulate('change', { target: { value: '68' } });
        const currentMinutes = wrapper.find({ name: 'currentMinutes' }).props().value.toString();
        expect(currentMinutes).toBe('59');
    });

    test('has placeholder', () => {
        const wrapper = shallow(<ReactTimeSelection placeholder="my test placeholder" />);
        const placeholder = wrapper.find('input').props().placeholder.toString();
        expect(placeholder).toBe('my test placeholder');
    });

    test('default onChange is empty', () => {
        const wrapper = shallow(<ReactTimeSelection />);
        wrapper.find('input').simulate('change', { target: { value: '68' } });
        const inputValue = wrapper.find('input').at(0).props().value.toString();
        expect(inputValue).toBe('');
    });

    /* MILITARY TIME TESTS */
    test('renders with military time (No #meridian input)', () => {
        const wrapper = shallow(<ReactTimeSelection isMilitaryTime />);
        wrapper.find('input').simulate('click');
        expect(wrapper.find('#meridian').exists()).toBe(false);
    });

    test('renders meridian sized container', () => {
        const wrapper = shallow(<ReactTimeSelection isMilitaryTime />);
        wrapper.find('input').simulate('click');
        expect(wrapper.find('.ReactTime-container-meridian').exists()).toBe(true);
    });

    test('renders all 4 buttons for military time', () => {
        const wrapper = shallow(<ReactTimeSelection isMilitaryTime />);
        wrapper.find('input').simulate('click');
        expect(wrapper.find('.ReactTime-arrow-button')).toHaveLength(4);
    });

    test('pressing "done" sets input value on military', () => {
        const wrapper = shallow(<ReactTimeSelection isMilitaryTime />);
        wrapper.find('input').simulate('click');
        const currentHours = wrapper.find({ name: 'currentHours' }).props().value;
        const currentMinutes = wrapper.find({ name: 'currentMinutes' }).props().value;
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
        const expectedString = `${hourString} : ${minString}`;
        expect(inputValue).toBe(expectedString);
    });

    test('direct input of hour greater than 24 on military', () => {
        const wrapper = shallow(<ReactTimeSelection isMilitaryTime />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentHours' }).simulate('change', { target: { value: '26' } });
        const currentHours = wrapper.find({ name: 'currentHours' }).props().value.toString();
        expect(currentHours).toBe('23');
    });

    test('up hours arrow adds to previous value on military', () => {
        const wrapper = shallow(<ReactTimeSelection isMilitaryTime />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentHours' }).simulate('change', { target: { value: '24' } });
        wrapper.find('.ReactTime-arrow-button').at(0).simulate('click');
        const newHours = wrapper.find({ name: 'currentHours' }).props().value;
        expect(newHours).toBe(0);
    });

    test('down hours arrow loops to 23 at hour 0 on military', () => {
        const wrapper = shallow(<ReactTimeSelection isMilitaryTime />);
        wrapper.find('input').simulate('click');
        wrapper.find({ name: 'currentHours' }).simulate('change', { target: { value: '0' } });
        wrapper.find('.ReactTime-arrow-button').at(1).simulate('click');
        const newHours = wrapper.find({ name: 'currentHours' }).props().value.toString();
        expect(newHours).toBe('23');
    });
});
